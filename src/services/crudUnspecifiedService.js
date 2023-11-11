import httpService from "../services/httpService.js";
import generalService from "../services/generalService.js";
import alertifyService from "../services/alertifyService.js";
import ResponseStatus from "../contracts/responseStatus.js";



async function insert(url, insertToItem, root, ref) {
    
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

                    if (ResponseStatus.Success === response.data.responseStatus) 
                    {
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
        }
    });

}


export default{
    insert
}