import axios from "axios";

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

});


// List of all the endpoints
export const sendOtp = (data: any) => http.post('/api/send-otp', data);
export const verifyOtp = (data: any) => http.post('/api/verify-otp', data);


export default http;