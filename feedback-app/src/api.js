import axios from 'axios';

// config axios
const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

export default API;
