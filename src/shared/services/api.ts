import axios from "axios";

export const apiServe = axios.create({
  baseURL: "https://api-jobin.onrender.com",
});
