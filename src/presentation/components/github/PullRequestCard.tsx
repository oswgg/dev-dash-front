import { useState } from "react"
import { Card } from "@/components/ui"
import { ChevronDown, ExternalLink } from "lucide-react"
import { GhPullRequest } from "@/domain/entities/gh-pull-request.entity"
import { PullRequestHeader } from "./PullRequestHeader"
import { PullRequestBody } from "./PullRequestBody"

const PullRequestCard = (props: GhPullRequest) => {
    const { body, url, internal_status } = props;

    const [showBody, setShowBody] = useState(false);
    const hasBody = !!body;
    
    // Determine card styling based on internal_status
    const isUpdated = internal_status === 'updated';
    const isNew = internal_status === 'new';
    
    const cardStyles = `
        w-full relative 
        ${hasBody ? 'cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all duration-500' : ''}
        ${isUpdated ? 'border-green-500 shadow-[0_0_0_1px_rgba(34,197,94,0.3)] dark:shadow-[0_0_0_1px_rgba(34,197,94,0.2)]' : ''}
        ${isNew ? 'border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,0.3)] dark:shadow-[0_0_0_1px_rgba(59,130,246,0.2)]' : ''}
    `;

    // Handle external link click without triggering the card's onClick
    const handleExternalLinkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(url, '_blank');
    };

    return (
        <Card 
            className={cardStyles}
            onClick={() => hasBody && setShowBody(!showBody)}
        >
            <div 
                className="absolute right-3 top-3 z-10 px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 flex items-center gap-1 text-xs font-medium text-primary transition-colors"
                title="Open PR on GitHub"
                onClick={handleExternalLinkClick}
            >
                <span>Open PR</span>
                <ExternalLink className="h-3 w-3" />
            </div>

            {hasBody && (
                <div 
                    className="absolute right-[100px] top-3 z-10 w-5 h-5 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20"
                    title="Click to view PR description"
                >
                    <div className={`transform transition-transform duration-300 ${showBody ? 'rotate-180' : ''}`}>
                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    </div>
                </div>
            )}
            
            <PullRequestHeader {...props} />


            <div className={`overflow-hidden transition-all duration-400 ease-in-out ${showBody ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {body && <PullRequestBody body={body} />}
            </div>
        </Card>
    )
}

export default PullRequestCard;