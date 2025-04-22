import { GetGhPullRequests } from "@/application/getGhPullRequests";
import { GhPullRequest } from "@/domain/entities/gh-pull-request.entity";
import { GithubRepositoryImpl } from "@/infrastructure/repositories/github.repository.impl";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import { GetGhPullRequestsToReview } from "@/application/getGhPullRequestsToReview";
import { GithubFactory } from "@/infrastructure/factories/GithubFactory.factory";
import { GithubRealTimeService } from "@/infrastructure/services/githubRealTime.service";



export const useGhPullRequests = (): { 
    owned        : GhPullRequest[],
    toReview     : GhPullRequest[],
    ownedError   : string | null, 
    toReviewError: string | null, 
    error        : string | null 
} => {
    const [ownedPullRequests, setOwnedPullRequests] = useState<GhPullRequest[]>([]);
    const [pullRequestsToReview, setPullRequestsToReview] = useState<GhPullRequest[]>([]);
    const [ownedError, setOwnedError] = useState<string | null>(null);
    const [toReviewError, setToReviewError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { setAuthError, logout } = useAuth();

    const apiClient = GithubFactory.createApiDatasource('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmFmYzE0NWYyNmY0NjE0NWE5NmZhNiIsImlhdCI6MTc0NTA0MDk4MiwiZXhwIjoxNzQ3NjMyOTgyfQ.NfqVT1azfqNWCwaEqf9Wj8S1gi60tzF1jnGFNbWF80U');
    const socketClient = GithubFactory.createSocketDatasource('http://localhost:3000/github');

    const gitHubRepository = new GithubRepositoryImpl(apiClient);
    const githubRealTimeService = new GithubRealTimeService(socketClient);

    const getOwnedPullRequests = new GetGhPullRequests(gitHubRepository);
    const getPullRequestsToReview = new GetGhPullRequestsToReview(gitHubRepository);

    const handleResult = (result, setData, setError) => {
        if (result.status === 'fulfilled') {
            setData(result.value);
            setError(null);
        } else {
            console.error(result.reason);
            setData([]);
            setError(result.reason.message);
        }
    };
    
    const fetchData = async () => {
        const [owned, toReview] = await Promise.allSettled([
            getOwnedPullRequests.execute(),
            getPullRequestsToReview.execute()
        ]);
    
        handleResult(owned, setOwnedPullRequests, setOwnedError);
        handleResult(toReview, setPullRequestsToReview, setToReviewError);
    
        const isUnauthorized = 
            (owned.status === 'rejected' && owned.reason.status === 401) ||
            (toReview.status === 'rejected' && toReview.reason.status === 401);
    
        if (isUnauthorized) {
            const msg = "Your session has expired. Please login again.";
            setAuthError(msg);
            setError(msg);
            logout();
        }
    };


    useEffect(() => {
        fetchData();

        githubRealTimeService.subscribeToNewPullRequest((newPR: GhPullRequest) => {
            setOwnedPullRequests(current => [newPR, ...current]);
        });
        githubRealTimeService.subscribeToUpdatedPullRequest((updatedPR: GhPullRequest) => {
            setOwnedPullRequests(current => current.map(pr => pr.title === updatedPR.title ? updatedPR : pr));
        });

        return () => {
            githubRealTimeService.unsubscribeToNewPullRequest();
            githubRealTimeService.unsubscribeToUpdatedPullRequest();
        }
    }, []);

    useEffect(() => { }, [ownedPullRequests]);

    return {
        owned: ownedPullRequests,
        toReview: pullRequestsToReview,
        ownedError,
        toReviewError,
        error
    };
}