import axios from "axios";

class AxiosClient {
    static baseUrl = `${process.env.REACT_APP_SERVER_BASE_URL}`;
    static token = JSON.parse(localStorage.getItem('authorized_user'))

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: AxiosClient.baseUrl,
            maxContentLength: Infinity,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "authorization": AxiosClient.token
            }
        })
    }

    setHeaders(headers) {
        this.axiosInstance.defaults.headers.common = {
            ...this.axiosInstance.defaults.headers.common,
            ...headers
        }
    }

    async get(url, config) {
        const res = await this.axiosInstance.get(url, config)
        return res.data
    }

    async post(url, payload) {

        const res = await this.axiosInstance.post(url, payload);
        return res.data;
    }
    async postFormData(url, formData) {
        const res = await this.axiosInstance.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...this.axiosInstance.defaults.headers.common
            }
        });
        return res.data;
    }


    async update(url, payload, config) {
        return await this.axiosInstance.patch(url, payload, config)
    }

    async updateFormData(url, formData) {
        console.log(formData);
        const res = await this.axiosInstance.patch(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...this.axiosInstance.defaults.headers.common
            }
        });

    }

    async delete(url, config) {
        return await this.axiosInstance.delete(url, config)
    }
}

export default AxiosClient