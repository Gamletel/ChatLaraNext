import Axios from "axios";

let token = null;

if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
}
const axios = Axios.create({
    baseURL: 'http://127.0.0.1:8000',
    // mode: 'no-cors',
    headers: {
        "X-Requested-With":"XMLHttpRequest",
        "Authorization": token ? `Bearer ${token}` : '',
    },
    withCredentials: true,
    withXSRFToken: true,
})

export default axios;