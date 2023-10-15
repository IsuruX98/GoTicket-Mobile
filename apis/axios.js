import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.1.170:8090/',
});

// Set up request interceptor to attach the authorization token to outgoing requests
instance.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('JWT');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            // Handle AsyncStorage error, if any
            console.error('AsyncStorage error:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
