import axios from "axios";

export const url = "https://mygymroutine.herokuapp.com/";
export const apiInstance = axios.create({
    baseURL: url,
});
