import { Avatar, AvatarFallback, AvatarImage, Badge, CardHeader } from "@/components/ui"
import { GitPullRequest, MessageSquare, Clock } from "lucide-react"
import { GhPullRequest } from "@/domain/entities/gh-pull-request.entity"
import { formatDate } from "@/lib/utils"
import GhLabel from "./GhLabel"

export const PullRequestHeader = ({
    title,
    state,
    author,
    authorAvatar,
    createdAt,
    updatedAt,
    repositoryName,
    comments,
    labels,
}: GhPullRequest) => {
    return (
        <CardHeader className="py-3">
            <div className="flex items-start gap-2">
                {/* Icon */}
                <div className="mt-0.5">
                    <GitPullRequest className="h-4 w-4 text-green-600" />
                </div>

                {/* Title */}
                <div className="flex-1 hover:text-primary">
                    <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm leading-tight">
                            {title}
                        </h3>
                        <Badge className='capitalize text-xs py-0 px-2 h-5' variant='outline'>
                            {state}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">in {repositoryName}</span>

                        {/* Condensed footer info */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Avatar className="h-4 w-4">
                                    <AvatarImage src={authorAvatar || "/placeholder.svg"} alt={author} />
                                    <AvatarFallback>{author.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span>{author}</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                <span>{comments}</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span title={`Updated ${formatDate(updatedAt)}`}>{formatDate(createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Labels section - only show if present */}
                    {labels.length > 0 &&
                        (<div className="flex flex-wrap gap-1 mt-1 -ml-1">
                            {labels.map((label, index) => <GhLabel key={index} label={label} />)}
                        </div>)
                    }
                </div>
            </div>
        </CardHeader>
    )
}