import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
// import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: 'https://smart-deals-server-blue.vercel.app'
})

const useAxiosSecure = () => {
    const { user, logout } = useAuth();
    // const navigate = useNavigate();
    // set token in the header so use all the api call using axios hooks
    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use((config) => {
            console.log(config);
            config.headers.authorization = `Bearer ${user.accessToken}`;
            return config;
        })

        //response interceptor
        const responseInterceptor = instance.interceptors.response.use(res => {
            return res;
        }, err => {
            const status = err.status;
            if (status === 401 || status === 403) {
                logout()
                    .then(() => {
                        // Navigate('/')
                    })
            }

        })

        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject(responseInterceptor);
        }

    }, [user, logout])
    return instance;
}

export default useAxiosSecure;