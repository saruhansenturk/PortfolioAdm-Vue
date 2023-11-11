import CustomStore from "devextreme/data/custom_store";
import httpService from "../services/httpService.js";
import generalService from "../services/generalService.js";
import alertifyService from "../services/alertifyService.js";
import ResponseStatus from "../contracts/responseStatus.js";

const _isNotEmpty = (value) =>
    value !== undefined && value !== null && value !== "";

function _refreshGrid(ref) {
    // ref.grid.instance.selectRowsByIndexes([0]);
    ref.grid.instance.refresh();
}

function getAll(url) {
    var dataSource = new CustomStore({
        key: "id",
        load: async function (loadOptions) {
            let params = "?";
            [
                "skip",
                "take",
                "requireTotalCount",
                "requireGroupCount",
                "sort",
                "filter",
                "totalSummary",
                "group",
                "groupSummary",
            ].forEach((i) => {
                if (i in loadOptions && _isNotEmpty(loadOptions[i])) {
                    params += `${i}=${JSON.stringify(loadOptions[i])}&`;
                }
            });
            params = params.slice(0, -1);

            var token = await generalService.getAuthItemsIfExist();


            var pagingRequest = {
                skip: loadOptions.skip,
                take: loadOptions.take,
                requireTotalCount: loadOptions.requireTotalCount,
            };

            if (token != false) {
                var response = await httpService.get(url, token, pagingRequest);
                return response.data;
            }
        },
    });

    return dataSource;
}

function deleteItem(selected, url, root, ref) {
    if (selected == -1) {
        alertifyService.ToastrService.fire({
            icon: "warning",
            text: "Plase select an item before this transaction!",
        });
        return;
    }

    if (selected.isDeleted) {
        alertifyService.ToastrService.fire({
            icon: "info",
            text: "This item already deleted!",
        });
    } else {
        alertifyService.SweetAlertService.process(
            "Warning!",
            "You are about to delete this object. Are you sure?"
        ).then(async (result) => {
            if (result.isConfirmed) {
                root.Loader.toggle({
                    isShow: true,
                });
                var token = await generalService.getAuthItemsIfExist();
                if (token != false) {
                    try {
                        var response = await httpService.post(url, {}, token);

                        if (
                            ResponseStatus.Success ===
                            response.data.responseStatus
                        ) {
                            alertifyService.ToastrService.fire({
                                icon: "success",
                                text: "Successfully Deleted!",
                            });
                        } else {
                            alertifyService.ToastrService.fire({
                                icon: "error",
                                text: "An error occured when item deleted!",
                            });
                        }
                    } catch (err) {
                        alertifyService.ToastrService.fire({
                            color: "black",
                            text: "An error occured when connect to server!",
                            icon: "error",
                            grow: true,
                        });
                    }
                }

                root.Loader.toggle({
                    isShow: false,
                });
                _refreshGrid(ref);
            }
        });
    }
}

function insertItem(url, insertToItem, root, ref) {
    alertifyService.SweetAlertService.process(
        "Info!",
        "Are you sure add to this item?"
    ).then(async (result) => {
        if (result.isConfirmed) {
            root.Loader.toggle({
                isShow: true,
            });
            var token = await generalService.getAuthItemsIfExist();
            if (token != false) {
                try {
                    var response = await httpService.post(
                        url,
                        insertToItem,
                        token
                    );

                    if (
                        ResponseStatus.Success === response.data.responseStatus
                    ) {
                        alertifyService.ToastrService.fire({
                            icon: "success",
                            text: "Successfully Added!",
                        });
                    } else {
                        alertifyService.ToastrService.fire({
                            icon: "error",
                            text: "An error occured when item to add!",
                        });
                    }
                } catch (err) {
                    alertifyService.ToastrService.fire({
                        color: "black",
                        text: "An error occured when connect to server!",
                        icon: "error",
                        grow: true,
                    });
                }
            }

            root.Loader.toggle({
                isShow: false,
            });
            _refreshGrid(ref);
        }
    });
}

function updateItem(url, updateToItem, root, ref) {
    alertifyService.SweetAlertService.process(
        "Info!",
        "Are you sure add to this item?"
    ).then(async (result) => {
        if (result.isConfirmed) {
            root.Loader.toggle({
                isShow: true,
            });
            var token = await generalService.getAuthItemsIfExist();
            if (token != false) {
                try {
                    var response = await httpService.post(
                        url,
                        updateToItem,
                        token
                    );

                    if (
                        ResponseStatus.Success === response.data.responseStatus
                    ) {
                        alertifyService.ToastrService.fire({
                            icon: "success",
                            text: "Successfully Updated!",
                        });
                    } else {
                        alertifyService.ToastrService.fire({
                            icon: "error",
                            text: "An error occured when item to update!",
                        });
                    }
                } catch (err) {
                    alertifyService.ToastrService.fire({
                        color: "black",
                        text: "An error occured when connect to server!",
                        icon: "error",
                        grow: true,
                    });
                }
            }

            root.Loader.toggle({
                isShow: false,
            });
            _refreshGrid(ref);
        }
    });
}
export default {
    getAll,
    deleteItem,
    insertItem,
    updateItem,
};
