import { GhPullRequest } from "../entities/gh-pull-request";





export interface ApiDatasource {
    getIsImplementationActive(implementation: string): Promise<boolean>;
    getPullRequests(): Promise<[GhPullRequest[] | null, string?]> ;
}