import axios from "axios";

class AxiosClient {
    static baseUrl = `${process.env.REACT_APP_SERVER_BASE_URL}`;

    constructor() {
        //console.log("Base URL:", AxiosClient.baseUrl); // Log della base URL
        this.axiosInstance = axios.create({
            baseURL: AxiosClient.baseUrl,
            maxContentLength: Infinity,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            }
        });
    }

    getToken() {
        const token = JSON.parse(localStorage.getItem('authorized_user'));
        //console.log("Token from localStorage:", token); // Log del token recuperato
        return token ? `${token}` : '';
    }

    setHeaders(headers) {
        this.axiosInstance.defaults.headers.common = {
            ...this.axiosInstance.defaults.headers.common,
            ...headers
        };
        // console.log("Updated Headers:", this.axiosInstance.defaults.headers.common); // Log degli header aggiornati
    }

    async get(url, config) {
        this.setHeaders({ 'Authorization': this.getToken() });
        // console.log("GET Token:", this.axiosInstance.defaults.headers.common['Authorization']);
        const res = await this.axiosInstance.get(url, config);
        return res.data;
    }

    async post(url, payload) {
        this.setHeaders({ 'Authorization': this.getToken() });
        //console.log("POST Token:", this.axiosInstance.defaults.headers.common['Authorization']);
        const res = await this.axiosInstance.post(url, payload);
        return res.data;
    }

    async postFormData(url, formData) {
        this.setHeaders({ 'Authorization': this.getToken() });
        //console.log("POST FormData Token:", this.axiosInstance.defaults.headers.common['Authorization']); // Log del token per POST FormData
        const res = await this.axiosInstance.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...this.axiosInstance.defaults.headers.common
            }
        });
        return res.data;
    }

    async update(url, payload, config) {
        this.setHeaders({ 'Authorization': this.getToken() });
        //console.log("PATCH Token:", this.axiosInstance.defaults.headers.common['Authorization']); // Log del token per PATCH
        return await this.axiosInstance.patch(url, payload, config);
    }

    async updateFormData(url, formData) {
        this.setHeaders({ 'Authorization': this.getToken() });
        //console.log("PATCH FormData Token:", this.axiosInstance.defaults.headers.common['Authorization']); // Log del token per PATCH FormData
        const res = await this.axiosInstance.patch(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...this.axiosInstance.defaults.headers.common
            }
        });
        return res.data;
    }

    async delete(url, config) {
        this.setHeaders({ 'Authorization': this.getToken() });
        //console.log("DELETE Token:", this.axiosInstance.defaults.headers.common['Authorization']); // Log del token per DELETE
        return await this.axiosInstance.delete(url, config);
    }
}

export default AxiosClient;
