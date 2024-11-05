import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Укажите URL вашего бэкенда
});

export default instance;