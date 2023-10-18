import axios from "axios"

const API_BASE_URL = 'http://localhost:8080/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
})

api.interceptors.request.use(
    async config => {
      config.headers = { 
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type":"application/json"
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });