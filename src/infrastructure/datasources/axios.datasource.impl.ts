import { ApiDatasource } from "@/domain/datasources/api.datasource";
import axios, { AxiosInstance } from "axios";
import { GhPullRequestMapper } from "../mappers/gh-pull-request.mapper";
import { GhPullRequest } from "@/domain/entities/gh-pull-request";



const BASE_URL = "http://localhost:3000/api";

export class AxiosDatasourceImpl implements ApiDatasource {
    constructor(
        private readonly token: string,
        private readonly axioClient: AxiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        })
    ) { }

    async getPullRequests(): Promise<GhPullRequest[] | null> {
        const response = await this.axioClient.get("/services/github/pull-requests");
        
        const ghPullRequests = GhPullRequestMapper.fromArrayToEntities(response.data);

        return ghPullRequests;
    }
}