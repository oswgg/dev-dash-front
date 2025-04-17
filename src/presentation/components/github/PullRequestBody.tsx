import { CardContent } from "@/components/ui"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MarkdownComponents } from "./MarkdownComponents";

interface PullRequestBodyProps {
    body: string;
}

export const PullRequestBody = ({ body }: PullRequestBodyProps) => {
    return (
        <CardContent className="pt-0 pb-3">
            <div className="border-t border-border pt-3 mt-1 text-sm prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={MarkdownComponents}
                >
                    {body}
                </ReactMarkdown>
            </div>
        </CardContent>
    )
}