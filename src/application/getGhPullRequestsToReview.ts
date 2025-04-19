import { GhPullRequest } from "@/domain/entities/gh-pull-request.entity";
import { GithubRepository } from "@/domain/repositories/github.repository";





export class GetGhPullRequestsToReview {
    constructor(
        private readonly githubRepository: GithubRepository
    ) { }
    
    async execute(): Promise<GhPullRequest[]> {
        return this.githubRepository.getPullRequestsToReview();
    }
}