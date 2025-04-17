import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useGhPullRequests } from "../hooks/useGhPullRequests.hook";
import PullRequestCard from "./github/PullRequestCard";
import { TabsContent } from "@radix-ui/react-tabs";
import EmptyState from "./EmptyState";



const Dashboard = () => {
    const { PRs, error: githubError } = useGhPullRequests();

    const renderPRs = () => {
        return PRs.map((pr, index) => (
            <PullRequestCard key={index} {...pr} />
        ));
    };

    return (
        <>
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-1/4 grid-cols-2">
                    <TabsTrigger
                        value="all"
                        className="dark:data-[state=active]:bg-black data-[state=active]:text-white"
                    >
                        All
                    </TabsTrigger>
                    <TabsTrigger
                        value="github"
                        className="dark:data-[state=active]:bg-black data-[state=active]:text-white"
                    >
                        Github
                    </TabsTrigger>
                </TabsList>


                <TabsContent value="all" className="flex flex-col gap-4">
                    {githubError ? <EmptyState type="all" /> : renderPRs()}
                </TabsContent>
                <TabsContent value="github" className="flex flex-col gap-4">
                    {githubError ? <EmptyState type="github" /> : renderPRs()}
                </TabsContent>

            </Tabs>
        </>
    );
}

export default Dashboard;