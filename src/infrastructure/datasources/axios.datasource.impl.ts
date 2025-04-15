import { ApiDatasource } from "@/domain/datasources/api.datasource";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { GhPullRequestMapper } from "@/infrastructure/mappers/gh-pull-request.mapper";
import { GhPullRequest } from "@/domain/entities/gh-pull-request";



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
                "Authorization": `Bearer ${this.token}`
            }
        })

        this.axiosClient.interceptors.response.use((response): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
            return Promise.resolve(response);
        }, (error: AxiosError) => {
            return Promise.reject({ status: error.status, message: error.response?.data?.error });
        })
    }

    async getIsImplementationActive(implementation: string): Promise<boolean> {
        const response = await this.axiosClient.get(`/implementations/${implementation}`);
        if (!response.data) {
            return false;
        }

        return response.data.active;
    }

    async getPullRequests(): Promise<GhPullRequest[]> {
        const response = await this.axiosClient.get("/services/github/pull-requests");
        if (!response.data) {
            return [];
        }

        const ghPullRequests = GhPullRequestMapper.fromArrayToEntities(response.data);

        return ghPullRequests;
    }
}