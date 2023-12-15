import axios from "axios";

const API_URL = 'http://localhost:5000/api/v1'

const request = async ({ url, method, data = {} }) => {
    const response = await axios[method](`${API_URL}/${url}`, data);
    return response.data
}

export {
    request
}