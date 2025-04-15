import { GetGhPullRequests } from "@/application/getGhPullRequests";
import { GhPullRequest } from "@/domain/entities/gh-pull-request";
import { AxiosDatasourceImpl } from "@/infrastructure/datasources/axios.datasource.impl";
import { GithubRepositoryImpl } from "@/infrastructure/repositories/github.repository.impl";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";




export const useGhPullRequests = () => {
    const [ghPullRequests, setGhPullRequests] = useState<GhPullRequest[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { setAuthError, logout } = useAuth();

    const apiClient = new AxiosDatasourceImpl('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmFmYzE0NWYyNmY0NjE0NWE5NmZhNiIsImlhdCI6MTc0NDUwMTc4MCwiZXhwIjoxNzQ3MDkzNzgwfQ.Haf0QQx2cDCyclZcww7vMbBKFkmEniusPUhBbRIamjk');
    const gitHubRepository = new GithubRepositoryImpl(apiClient);


    const getPullRequests = async () => {
        try {
            const getPRs = new GetGhPullRequests(gitHubRepository);
            const PRs = await getPRs.execute();

            setGhPullRequests(PRs);
        } catch (error: any) {
            if (error.status === 401) {
                setAuthError("Your session has expired. Please login again.");
                logout();
            }
            setError(error.message);
        }
    }

    useEffect(() => {
        getPullRequests();
    }, []);

    return {
        PRs: ghPullRequests,
        error: error,
    };
}