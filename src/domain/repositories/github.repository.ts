import { GhPullRequest } from "../entities/gh-pull-request.entity";





export interface GithubRepository {
    getPullRequests(): Promise<GhPullRequest[]> ;
}