import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { useGhPullRequests } from "../hooks/useGhPullRequests.hook";
import { TabsContent } from "@radix-ui/react-tabs";
import { useGetActiveImplementations } from "../hooks/useGetActiveImplementations.hook";
import PullRequestCard from "./github/PullRequestCard";
import EmptyState from "./EmptyState";


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<string>('mine');
    const [activeServiceTab, setActiveServiceTab] = useState<string>('all');

    const { github } = useGetActiveImplementations(['github']);
    const { owned, toReview, ownedError, toReviewError, error } = useGhPullRequests();

    const handleServiceTabChange = (value: string) => {
        if (value === 'all') {
            setActiveServiceTab('all');
        } else if (value === 'github') {
            setActiveServiceTab('github');
        }
    }

    const handleFilterChange = (value: string) => {
        if (value === 'mine') {
            setActiveTab('mine');
        } else if (value === 'review') {
            setActiveTab('review');
        }
    }

    const renderPRs = (activeTab: string) => {
        if (activeTab === 'mine') {
            if (ownedError) {   
                return <p>{ownedError}</p>
            }
            return owned.map((pr, index) => (
                <PullRequestCard key={index} {...pr} />
            ));
        } else if (activeTab === 'review') {
            if (toReviewError) {
                return <p>{toReviewError}</p>
            }
            return toReview.map((pr, index) => (
                <PullRequestCard key={index} {...pr} />
            ));
        }
    };

    return (
        <div className="relative">
            <div className="relative w-full">
                <div className="flex justify-between items-center w-full mb-4">
                    <div className="w-1/4">
                        <Tabs defaultValue="all" className="w-full" onValueChange={handleServiceTabChange}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger
                                    value="all"
                                    className="dark:data-[state=active]:bg-black data-[state=active]:text-white"
                                >
                                    All </TabsTrigger>
                                <TabsTrigger
                                    value="github"
                                    className="dark:data-[state=active]:bg-black data-[state=active]:text-white"
                                >
                                    Github
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="w-1/4">
                        {
                            activeServiceTab === 'github' && (
                                <Tabs defaultValue="mine" className="w-full" onValueChange={handleFilterChange}>
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger
                                            value="mine"
                                            className="dark:data-[state=active]:bg-black data-[state=active]:text-white"
                                        >
                                            By you
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="review"
                                            className="dark:data-[state=active]:bg-black data-[state=active]:text-white"
                                        >
                                            To review
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            )
                        }
                    </div>
                </div>

                <div className="w-full">
                    <Tabs defaultValue="all" className="w-full">
                        <TabsContent value="all" className="flex flex-col gap-4">
                            {
                                error
                                    ? <EmptyState type="all" />
                                    : renderPRs(activeTab)
                            }
                        </TabsContent>
                        <TabsContent value="github" className="flex flex-col gap-4">
                            {
                                !github  // Si no hay github, mostramos activar github
                                ? <EmptyState type="all" />
                                : error
                                    ? <p>{error}</p> // Si hay error, mostramos el error
                                    : renderPRs(activeTab)
                            }
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;