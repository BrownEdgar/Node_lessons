import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
});

export default instance;