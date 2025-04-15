import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
    type: 'github' | 'jira' | 'all';
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
    if (type === 'github') {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                    <Github className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No GitHub PRs Connected</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                    Connect your GitHub account to see and track your pull requests in one place.
                </p>
                <Button className="gap-2">
                    <Github className="h-4 w-4" />
                    Connect GitHub
                </Button>
            </div>
        );
    }

    if (type === 'jira') {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                    <ExternalLink className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Jira Tickets Connected</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                    Connect your Jira account to see and track your tickets alongside your GitHub PRs.
                </p>
                <Button className="gap-2">
                    Connect Jira
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
                <ExternalLink className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Connect Your Accounts</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
                Track all your work in one place by connecting your GitHub and Jira accounts.
            </p>
            <div className="flex gap-3">
                <Button className="gap-2">
                    <Github className="h-4 w-4" />
                    Connect GitHub
                </Button>
                <Button variant="outline">
                    Connect Jira
                </Button>
            </div>
        </div>
    );
};

export default EmptyState;