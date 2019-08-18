
// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance3' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: "http://127.0.0.1:9000"
});


 axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

 // Also add/ configure interceptors && all the other cool stuff

export default instance;