import axios from "axios"

const service = axios.create({
    baseURL: '/api',
    timeout: 5000,
})
service.interceptors.request.use((config) => {
    return config;
})
service.interceptors.response.use((res) => {
    if (res.status == 200)
        return res.data;
    else
        return Promise.reject(new Error('failed'));
}, (err) => {
    return Promise.reject(err);
})
export default service;