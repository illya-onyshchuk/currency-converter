import axios from 'axios'
import { API_LINK } from "../config/index";

const api = axios.create({
  baseURL: API_LINK, 
});


export const getCurrencyRates = () => api.get(API_LINK);

