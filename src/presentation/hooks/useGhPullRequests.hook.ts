import { GetGhPullRequests } from "@/application/getGhPullRequests";
import { GhPullRequest } from "@/domain/entities/gh-pull-request";
import { AxiosDatasourceImpl } from "@/infrastructure/datasources/axios.datasource.impl";
import { GithubRepositoryImpl } from "@/infrastructure/repositories/github.repository.impl";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";




export const useGhPullRequests = () => {
    const [ghPullRequests, setGhPullRequests] = useState<GhPullRequest[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { setAuthError } = useAuth();

    const apiClient = new AxiosDatasourceImpl('');
    const gitHubRepository = new GithubRepositoryImpl(apiClient);


    const getPullRequests = async () => {
        try {
            const getPRs = new GetGhPullRequests(gitHubRepository);
            const [PRs, error] = await getPRs.execute();

            if (error) {
                setError(error);
                return;
            }
            
            setGhPullRequests(PRs);
        } catch (error: any) {
            if (error.status === 401) {
                setAuthError("Your session has expired. Please login again.");
            }
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