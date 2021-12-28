import axios from 'axios';
import { backendUrl } from '../urlConfig';

const token = window.localStorage.getItem('token');

const axiosIntance = axios.create({
    baseURL: backendUrl,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

export default axiosIntance;