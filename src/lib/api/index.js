import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { USER_TOKEN_KEY } from "../../constants/index.js";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const getToken = async () => {
  return SecureStore.getItemAsync(USER_TOKEN_KEY);
};

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

/* Add auth header interceptor */
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Retry configuration
// would be lovely to have some retry setup here

const handleApiSuccess = (res) => {
  return res;
};

const handleApiError = (err) => {
  if (err.response) {
    // Handle error response from the server
    const { data, status } = err.response;
    const errorMessage = data.message || "An error occurred";

    // console.error(`Backend returned code ${status}, body was: ${errorMessage}`);
    throw err.response;
  } else if (err.request) {
    // Handle network error (no response received)
    console.error(
      "A network error occurred. Please check your internet connection."
    );
    throw "Network Error";
  } else {
    // Handle unexpected error
    console.error("An unexpected error occurred:", err.message);
    throw "Unexpected Error";
  }
};

export const Api = {
  getCancelTokenSource: () => axios.CancelToken.source(),
  get: (endpoint, config) =>
    axiosInstance
      .get(endpoint, config)
      .then(handleApiSuccess)
      .catch(handleApiError),
  post: (endpoint, data, config) =>
    axiosInstance
      .post(endpoint, data, config)
      .then(handleApiSuccess)
      .catch(handleApiError),
  put: (endpoint, data, config) =>
    axiosInstance
      .put(endpoint, data, config)
      .then(handleApiSuccess)
      .catch(handleApiError),
  patch: (endpoint, data, config) =>
    axiosInstance
      .patch(endpoint, data, config)
      .then(handleApiSuccess)
      .catch(handleApiError),
  delete: (endpoint, config) =>
    axiosInstance
      .delete(endpoint, config)
      .then(handleApiSuccess)
      .catch(handleApiError),
};

