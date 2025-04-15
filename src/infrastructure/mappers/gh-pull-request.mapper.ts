import { GhPullRequest } from "@/domain/entities/gh-pull-request";

export class GhPullRequestMapper {
    public static fromArrayToEntities(ghPullRequests: any[]): GhPullRequest[] {
        return ghPullRequests.map((ghPullRequest) => this.fromObjectToEntity(ghPullRequest));
    }

    public static fromObjectToEntity(pullRequest: { [key: string]: any }): GhPullRequest {
        return {
            id: pullRequest.id,
            title: pullRequest.title,
            number: pullRequest.number,
            state: pullRequest.state,
            author: pullRequest.author,
            authorAvatar: pullRequest.authorAvatar,
            createdAt: new Date(pullRequest.createdAt),
            updatedAt: new Date(pullRequest.updatedAt),
            url: pullRequest.url,
            repositoryName: pullRequest.repositoryName,
            isDraft: pullRequest.isDraft,
            isMerged: pullRequest.isMerged,
            comments: pullRequest.comments,
            labels: pullRequest.labels.map((label: any) => ({
                name: label.name,
                color: label.color,
            })),
            assignees: pullRequest.assignees.map((assignee: any) => ({
                login: assignee.login,
                avatar_url: assignee.avatar_url,
            })),
        };
    }
}