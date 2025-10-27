import axios from "axios";

/*export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // tomará la URL correcta según el entorno
  withCredentials: true,
});*/


export const api = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '/api',  
  withCredentials: true,
});