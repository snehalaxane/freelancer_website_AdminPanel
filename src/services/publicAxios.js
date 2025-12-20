// publicAxios.js
import axios from "axios";

const publicAxios = axios.create({
  baseURL: "https://freelanceserver-1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicAxios;
