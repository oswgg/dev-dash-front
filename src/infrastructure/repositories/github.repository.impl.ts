import { GithubRepository } from "@/domain/repositories/github.repository";
import { ApiDatasource } from "@/domain/datasources/api.datasource";
import { GhPullRequest } from "@/domain/entities/gh-pull-request";





export class GithubRepositoryImpl implements GithubRepository {
    constructor(
        private readonly api: ApiDatasource
    ) {}

    async getPullRequests(): Promise<GhPullRequest[] | null> {
        return this.api.getPullRequests();
    }
}