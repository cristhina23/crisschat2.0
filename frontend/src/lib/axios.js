import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";

export const api = axios.create({
  baseURL: isLocalhost
    ? "http://localhost:5001/api" 
    : import.meta.env.VITE_API_URL, 
  withCredentials: true,
});
