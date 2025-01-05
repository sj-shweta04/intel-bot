import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
});

export { API };
