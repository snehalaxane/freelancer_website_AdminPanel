// publicAxios.js
import axios from "axios";

const publicAxios = axios.create({
  baseURL: "https://api.goexpertsapps.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicAxios;
