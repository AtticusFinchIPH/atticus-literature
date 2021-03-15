import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'develop' ? 'http://localhost:3000' : '',
});
  
export default axiosInstance;