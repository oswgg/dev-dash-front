import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui"
import { ChevronDown, ExternalLink } from "lucide-react"
import { GhPullRequest } from "@/domain/entities/gh-pull-request.entity"
import { PullRequestHeader } from "./PullRequestHeader"
import { PullRequestBody } from "./PullRequestBody"

interface PRCardProps extends GhPullRequest {
    index: number;
}

interface StatusStyles {
    border: string;
    bg: string;
    text: string;
}

const PullRequestCard = (props:  PRCardProps) => {
    const { body, url, internal_status, index } = props;
    const [showBody, setShowBody] = useState(false);
    const [showBorder, setShowBorder] = useState(true);
    const hasBody = !!body;

    useEffect(() => {
        setShowBorder(true);

        // Set a timer to remove the border after 3 seconds
        const timer = setTimeout(() => {
            setShowBorder(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [internal_status]); // Run when internal_status changes

    const getStatusStyles = (): StatusStyles => {
        if (!showBorder) return {
            border: 'border-gray shadow-[0_0_0_1px_rgba(107,114,128)] dark:shadow-[0_0_0_1px_rgba(107,114,128,0.2)] hover:border-gray-500/50',
            bg: 'bg-gray-500/10',
            text: 'text-gray-500'
        }

        switch (internal_status) {
            case 'closed':
                return {
                    border: 'border-red shadow-[0_0_0_1px_rgba(239,68,68,0.7)] dark:shadow-[0_0_0_1px_rgba(239,68,68,0.6)] hover:border-red-500/50',
                    bg: 'bg-red-500/10',
                    text: 'text-red-500'
                }
            case 'merged':
                return {
                    border: 'border-green shadow-[0_0_0_1px_rgba(34,197,94,0.7)] dark:shadow-[0_0_0_1px_rgba(34,197,94,0.6)] hover:border-green-500/50',
                    bg: 'bg-green-500/10',
                    text: 'text-green-500'
                }
            case 'updated':
                return {
                    border: 'border-green shadow-[0_0_0_1px_rgba(34,197,94,0.7)] dark:shadow-[0_0_0_1px_rgba(34,197,94,0.6)] hover:border-green-500/50',
                    bg: 'bg-green-500/10',
                    text: 'text-green-500'
                }
            case 'new':
                return {
                    border: 'border-blue shadow-[0_0_0_1px_rgba(59,130,246,0.7)] dark:shadow-[0_0_0_1px_rgba(59,130,246,0.6)] hover:border-blue-500/50',
                    bg: 'bg-blue-500/10',
                    text: 'text-blue-500'
                }

            default:
                return {
                    border: 'border-gray shadow-[0_0_0_1px_rgba(107,114,128)] dark:shadow-[0_0_0_1px_rgba(107,114,128,0.2)] hover:border-gray-500/50',
                    bg: 'bg-gray-500/10',
                    text: 'text-gray-500'
                }
        }
    };

    const statusStyles = getStatusStyles();

    const cardStyles = `
        w-full relative 
        ${hasBody ? 'cursor-pointer transition-all duration-500' : ''}
        ${statusStyles.border}
        hover:shadow-sm
    `;

    // Event handlers
    const handleExternalLinkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(url, '_blank');
    };

    const handleCardClick = () => hasBody && setShowBody(!showBody);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeOut"
            }}
        >

            <Card className={cardStyles} onClick={handleCardClick}>
                <div className="absolute right-3 top-3 z-10 flex items-center justify-center gap-2">
                    {/* Description toggle button */}
                    {hasBody && (
                        <div
                            className="w-5 h-5 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20"
                            title="Click to view PR description"
                        >
                            <div className={`transform transition-transform duration-300 ${showBody ? 'rotate-180' : ''}`}>
                                <ChevronDown className="h-3 w-3 text-muted-foreground" />
                            </div>
                        </div>
                    )}
                    {/* Status badge */}
                    {
                        internal_status &&
                        <div className={`px-2 py-1 rounded capitalize text-xs font-medium ${statusStyles.bg} ${statusStyles.text}`}>
                            {internal_status}
                        </div>
                    }
                    {/* External link */}
                    <div
                        className="px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 flex items-center gap-1 text-xs font-medium text-primary transition-colors"
                        title="Open PR on GitHub"
                        onClick={handleExternalLinkClick}
                    >
                        <span>Open PR</span>
                        <ExternalLink className="h-3 w-3" />
                    </div>
                </div>


                {/* PR Content */}
                <PullRequestHeader {...props} />
                <div className={`overflow-hidden transition-all duration-400 ease-in-out ${showBody ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    {body && <PullRequestBody body={body} />}
                </div>
            </Card>
        </motion.div>
    )
}

export default PullRequestCard;