import { GhPullRequest } from "../entities/gh-pull-request";





export interface GithubRepository {
    getPullRequests(): Promise<[GhPullRequest[] | null, string?]> ;
}