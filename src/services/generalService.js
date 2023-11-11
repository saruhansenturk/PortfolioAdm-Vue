import { Buffer } from "buffer";
import httpService from "./httpService";
window.Buffer = Buffer;

async function getAuthItemsIfExist() {
    var token = localStorage.getItem("accesstoken");
    var expireDate = localStorage.getItem("expiration");

    if (token != null && expireDate != null) {
        var expire = new Date(expireDate);
        var now = new Date();
        if (token && expire > now) {
            return token;
        }
    }
    return false;
}

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

const uploadImage = async (event) => {
    const base64 = await convertBase64(event);
    return base64;
};

async function contextMenuItems(url, e, root) {
    var response;


    if (e.target === "header") {
        // e.items can be undefined
        if (!e.items) e.items = [];

        // Add a custom menu item
        e.items.push({
            text: "Log Column Caption",
            onItemClick: () => {
                console.log(e.column.caption);
            },
        });
    }
    if (e.target === "content") {
        if (!e.items) e.items = [];

        e.items.push({
            text: "Show Details!",
            icon: 'mdi-pen',
            onItemClick: async () => {
                var token = await this.getAuthItemsIfExist();
                response = await httpService.get(url, token);
                console.log(response.data)
                root.ShowContent.toggle({
                    isActive: true,
                    data: response.data
                });
            },
        });
    }

}

export default {
    getAuthItemsIfExist,
    uploadImage,
    contextMenuItems
};
