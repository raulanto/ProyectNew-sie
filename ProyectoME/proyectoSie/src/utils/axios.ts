import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/panel/api/v1'
});

export default instance;
