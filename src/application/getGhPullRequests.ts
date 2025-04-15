import { GhPullRequest } from "@/domain/entities/gh-pull-request";
import { GithubRepository } from "@/domain/repositories/github.repository";




export class GetGhPullRequests {
    constructor(
        private readonly gitHubRepository: GithubRepository
    ) { }

    async execute(): Promise<GhPullRequest[]> {
        return await this.gitHubRepository.getPullRequests();
    }
}