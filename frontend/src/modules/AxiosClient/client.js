import axios from "axios";

class AxiosClient {
    static baseUrl = `${process.env.REACT_APP_SERVER_BASE_URL}`;
    static token = JSON.parse(localStorage.getItem('authorized_user'));

    constructor() {
        console.log("Token:", AxiosClient.token); // Log del token
        this.axiosInstance = axios.create({
            baseURL: AxiosClient.baseUrl,
            maxContentLength: Infinity,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: AxiosClient.token ? `${AxiosClient.token}` : ''
            }
        });
    }

    setHeaders(headers) {
        this.axiosInstance.defaults.headers.common = {
            ...this.axiosInstance.defaults.headers.common,
            ...headers
        };
    }

    async get(url, config) {
        console.log("GET Token:", this.axiosInstance.defaults.headers.common['Authorization']); // Log del token
        const res = await this.axiosInstance.get(url, config);
        return res.data;
    }

    async post(url, payload) {
        console.log("POST Token:", this.axiosInstance.defaults.headers.common['Authorization']); // Log del token
        const res = await this.axiosInstance.post(url, payload);
        return res.data;
    }

    async postFormData(url, formData) {
        console.log("POST FormData Token:", this.axiosInstance.defaults.headers.common['Authorization']); // Log del token
        const res = await this.axiosInstance.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...this.axiosInstance.defaults.headers.common
            }
        });
        return res.data;
    }

    async update(url, payload, config) {
        console.log("PATCH Token:", this.axiosInstance.defaults.headers.common['Authorization']); // Log del token
        return await this.axiosInstance.patch(url, payload, config);
    }

    async updateFormData(url, formData) {
        console.log("PATCH FormData Token:", this.axiosInstance.defaults.headers.common['Authorization']); // Log del token
        const res = await this.axiosInstance.patch(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...this.axiosInstance.defaults.headers.common
            }
        });
        return res.data;
    }

    async delete(url, config) {
        console.log("DELETE Token:", this.axiosInstance.defaults.headers.common['Authorization']); // Log del token
        return await this.axiosInstance.delete(url, config);
    }
}

export default AxiosClient;
