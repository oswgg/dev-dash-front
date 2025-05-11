import { ApiDatasource } from "@/domain/datasources/api.datasource";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class AxiosDatasourceImpl implements ApiDatasource {
    private readonly axiosClient: AxiosInstance;
    constructor(
        private readonly token: string,
    ) {
        this.axiosClient = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.token
            },
            withCredentials: true,
        });

        this.axiosClient.interceptors.response.use((response): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
            return Promise.resolve(response);
        }, (error: AxiosError) => {
            return Promise.reject({ status: error.status, message: error.response?.data?.error });
        });

    }
    
    async get(url: string): Promise<any> { 
        const response = await this.axiosClient.get(url);
        return response.data;
    }
    
    public get getToken(): string {
        return this.token;
    }
    
    async post(url: string, data: any): Promise<any> {
        const response = await this.axiosClient.post(url, data);
        return response.data;
    }
}