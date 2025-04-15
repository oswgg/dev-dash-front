import { Avatar, AvatarFallback, AvatarImage, Badge, Card, CardContent, CardFooter, CardHeader, Separator } from "@/components/ui"
import { GitPullRequest, MessageSquare, Clock } from "lucide-react"
import { GhPullRequest } from "@/domain/entities/gh-pull-request"
import GhLabel from "./GhLabel"
import GhAsignee from "./GhAsignee"

const PullRequestCard = ({
    title,
    state,
    author,
    authorAvatar,
    createdAt,
    updatedAt,
    repositoryName,
    comments,
    labels,
    assignees,
}: GhPullRequest) => {
    // Format the date to a relative time string (e.g., "2 hours ago")
    const formatDate = (date: Date) => {
        const now = new Date()
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
        if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
        return `${Math.floor(diffInSeconds / 31536000)} years ago`
    }

    // Function to check if a color has enough contrast against white

    // Determine the status for display
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-start gap-2">
                    {/* Icon */}
                    <div className="mt-0.5">
                        <GitPullRequest className="h-5 w-5 text-green-600" />
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                        <h3 className="font-semibold text-xl text-base leading-tight">{title}</h3>

                        <span className="text-sm text-muted-foreground mt-1 block">in {repositoryName}</span>

                        {/* Labes section */}
                        {labels.length > 0 &&
                            (<div className="flex flex-wrap gap-1 mt-2 -ml-1">
                                {labels.map((label, index) => <GhLabel key={index} label={label} />)}
                            </div>)
                        }
                    </div>

                    <Badge className='capitalize' variant='outline'>
                        {state}
                    </Badge>

                </div>

            </CardHeader>

            <CardContent className="pb-2">
                {/* Assignees section */}
                {assignees.length > 0 && (
                    <div className="flex items-center mt-2">
                        <div className="flex -space-x-2">
                            {assignees.map((assignee, index) => <GhAsignee key={index} assignee={assignee} />)}
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="pt-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">

                    <div className="flex items-center gap-1">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src={authorAvatar || "/placeholder.svg"} alt={author} />
                            <AvatarFallback>{author.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>{author}</span>
                    </div>

                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{comments}</span>
                    </div>

                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span title={`Updated ${formatDate(updatedAt)}`}>{formatDate(createdAt)}</span>
                    </div>

                    <Separator orientation="vertical" className="h-4" />
                </div>
            </CardFooter>
        </Card>
    )
}


export default PullRequestCard;