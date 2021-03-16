import axios from 'axios';

let baseURL;
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://smarket-cpr.herokuapp.com/';
} else {
  baseURL = 'http://localhost:4000';
}

const api = axios.create({
  baseURL,
});

export default api;
