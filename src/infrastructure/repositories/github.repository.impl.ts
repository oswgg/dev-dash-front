import { GithubRepository } from "@/domain/repositories/github.repository";
import { ApiDatasource } from "@/domain/datasources/api.datasource";
import { GhPullRequest } from "@/domain/entities/gh-pull-request.entity";
import { GhPullRequestMapper } from "../mappers/gh-pull-request.mapper";





export class GithubRepositoryImpl implements GithubRepository {
    constructor(
        private readonly api: ApiDatasource
    ) { }

    async getPullRequests(): Promise<GhPullRequest[]> {
        const data = await this.api.get("/services/github/pull-requests");
        if (!data) {
            return [];
        }

        const ghPullRequests = GhPullRequestMapper.fromArrayToEntities(data);
        return ghPullRequests;
    }
    
    async getPullRequestsToReview(): Promise<GhPullRequest[]> {
        const data = await this.api.get("/services/github/pull-requests/to-review");
        if (!data) {
            return [];
        }

        const ghPullRequests = GhPullRequestMapper.fromArrayToEntities(data);
        return ghPullRequests;
    }
}