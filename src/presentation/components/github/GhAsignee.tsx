import { Avatar, AvatarFallback, AvatarImage, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui";





const GhAsignee = ({ assignee }: { assignee: { login: string, avatar_url: string } }) => {
    return (
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Avatar className="h-6 w-6 border-2 border-background">
                    <AvatarImage src={assignee.avatar_url} alt={assignee.login} />
                    <AvatarFallback>{assignee.login.charAt(0)}</AvatarFallback>
                </Avatar>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-black">
                {assignee.login}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    );
};


export default GhAsignee