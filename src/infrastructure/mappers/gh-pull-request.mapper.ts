import { GhPullRequest } from "@/domain/entities/gh-pull-request";





export class GhPullRequestMapper {
    public static fromArrayToEntities(ghPullRequests: GhPullRequest[]): GhPullRequest[] {
        return ghPullRequests.map((ghPullRequest) => this.fromObjectToEntity(ghPullRequest));
    }

    public static fromObjectToEntity(ghPullRequest: { [key: string]: any }): GhPullRequest {
        return {
            id: ghPullRequest.id,
            title: ghPullRequest.title,
            url: ghPullRequest.url,
            number: ghPullRequest.number,
            user: ghPullRequest.user,
            labels: ghPullRequest.labels.map((label: any) => ({
                name: label.name,
                color: label.color,
            })),
            state: ghPullRequest.state,
            createdAt: ghPullRequest.created_at,
        };
    }
}