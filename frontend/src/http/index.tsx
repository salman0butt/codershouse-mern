import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const http: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// List of all the endpoints
export const sendOtp = (data: any): Promise<AxiosResponse<any>> => http.post('/api/send-otp', data);
export const verifyOtp = (data: any): Promise<AxiosResponse<any>> => http.post('/api/verify-otp', data);
export const activate = (data: any): Promise<AxiosResponse<any>> => http.post('/api/activate', data);
export const logout = (): Promise<AxiosResponse<any>> => http.post('/api/logout');

// Interceptors
http.interceptors.response.use(
  (config) => config,
  async (error: any) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
          withCredentials: true
        });
        return http.request(originalRequest);
      } catch (err: any) {
        console.log(err.message);
      }
    }
    throw error;
  }
);

export default http;
