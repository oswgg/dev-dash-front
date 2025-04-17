import { GhPullRequest } from "../entities/gh-pull-request.entity";





export interface ApiDatasource {
    activateImplementation(implementation: string) : Promise<void>;
    getIsImplementationActive(implementation: string): Promise<boolean>;
    getPullRequests(): Promise<GhPullRequest[]> ;
}