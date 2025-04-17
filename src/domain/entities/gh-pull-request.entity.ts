



export interface GhPullRequest {
    id: number,
    title: string,
    number: number,
    state: 'open' | 'closed' | 'merged' | 'draft',
    author: string,
    authorAvatar: string,
    createdAt: Date,
    updatedAt: Date,
    url: string,
    repositoryName: string,
    body: string | null,
    isDraft: boolean,
    isMerged: boolean,
    comments: number,
    labels: Array<{ name: string, color: string }>,
    assignees: Array<{ login: string, avatar_url: string }>;
}