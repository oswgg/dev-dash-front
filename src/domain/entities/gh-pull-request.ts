



export interface GhPullRequest {
    id: number;
    title: string;
    url: string;
    number: number;
    user: string;
    labels: Array<{ name: string, color: string }>;
    state: string;
    createdAt: Date;
}