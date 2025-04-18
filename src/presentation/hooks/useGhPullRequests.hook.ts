import { GetGhPullRequests } from "@/application/getGhPullRequests";
import { GhPullRequest } from "@/domain/entities/gh-pull-request.entity";
import { AxiosDatasourceImpl } from "@/infrastructure/datasources/axios.datasource.impl";
import { GithubRepositoryImpl } from "@/infrastructure/repositories/github.repository.impl";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import { SocketIOClient } from "@/infrastructure/datasources/socket-io.datasource.impl";
import { GhPullRequestMapper } from "@/infrastructure/mappers/gh-pull-request.mapper";




export const useGhPullRequests = () => {
    const [ghPullRequests, setGhPullRequests] = useState<GhPullRequest[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { setAuthError, logout } = useAuth();

    const apiClient = new AxiosDatasourceImpl('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmFmYzE0NWYyNmY0NjE0NWE5NmZhNiIsImlhdCI6MTc0NDUwMTc4MCwiZXhwIjoxNzQ3MDkzNzgwfQ.Haf0QQx2cDCyclZcww7vMbBKFkmEniusPUhBbRIamjk');
    const gitHubRepository = new GithubRepositoryImpl(apiClient);

    const socketClient = new SocketIOClient('http://localhost:3000/github');

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
    
    const listenForNewPullRequest = (data: any) => {
        const newPullRequest = GhPullRequestMapper.fromObjectToEntity(data);
        newPullRequest.internal_status = 'new';
        setGhPullRequests(current => {
            const newprs = [newPullRequest, ...current];
            return newprs;
        });
    }
    
    const listenForUpdatedPullRequest = (data: any) => {
        const updated = GhPullRequestMapper.fromObjectToEntity(data);
        updated.internal_status = 'updated';
        setGhPullRequests(current => current.map(pr => pr.title === updated.title ? updated : pr));
    }

    useEffect(() => {
        getPullRequests();

        socketClient.on('new-pull-request', listenForNewPullRequest);
        socketClient.on('updated-pull-request', listenForUpdatedPullRequest);

        return () => {
            socketClient.off('new-pull-request');
            socketClient.off('updated-pull-request');
        }
    }, []);

    useEffect(() => {}, [ghPullRequests]);

    return {
        PRs: ghPullRequests,
        error: error,
    };
}