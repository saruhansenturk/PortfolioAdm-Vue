import axios from "axios";

async function post(url, data, token, params = null) {
    var response = await axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Access-Control-Allow-Headers",
        },
        params: params,
    });
    return response;
}

async function get(url, token, queryParams = null) {
    var response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: queryParams,
    });

    return response;
}
export default {
    post,
    get,
};
