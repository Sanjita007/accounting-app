import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

// it adds headers to each call
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (resp) => {
    debugger;
    if (resp.data.statusCode == 401) {
      handleUnauthorized();
    }

    return resp;
  },
  async (error) => {
    debugger;
    if (error.response.status == 401) {
      handleUnauthorized();
    }

    return Promise.reject(error);
  },
);
const handleUnauthorized = () => {
  localStorage.removeItem('accessToken');
  window.location.href = '/auth/login';
};

export default api;
