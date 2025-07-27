import axios from "axios";
import * as SecureStorage from "expo-secure-store";
import Toast from "react-native-toast-message";
import { AnyZodTuple } from "zod/v3";

//axios instance
const apiClient = axios.create({
  baseURL: process.env.EXPO_API_BASE_URL || "http://localhost:3000/api",
  timeout: 10000, //request timoue in milliseconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//interceptor for authentication,error handling

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStorage.getItemAsync("clerkTone");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error: any) {
      console.warn("Failed to attach token", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("Response Received:", response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("API Error:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
      Toast.show({
        type: "error",
        text1: `Error, ${error.response.data.message || "Something went wrong"}`,
      });
      // alert(`Error: ${error.response.status} - ${error.response.data.message || 'Something went wrong!'}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network Error:", error.request);
      // alert('Network Error: Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      // alert(`Request Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);
export default apiClient;
