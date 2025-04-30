import axios from "axios";

import { BASE_URL } from "../config/urls.config";


const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
//   headers: {
//     "x-rapidapi-key": "90845d6062msh1bd8c7755c03cb9p134c77jsn26ca06c37106",
//     "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
//   },
});

export default api;