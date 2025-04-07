import axios from 'axios';

const publicRequest = axios.create({
    baseURL: 'http://localhost:5000/',
});

export default publicRequest;