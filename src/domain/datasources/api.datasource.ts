import { GhPullRequest } from "../entities/gh-pull-request";





export interface ApiDatasource {
    getPullRequests(): Promise<GhPullRequest[] | null>;
}