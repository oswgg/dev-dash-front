import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useGhPullRequests } from "../hooks/useGhPullRequests.hook";
import { useGetActiveImplementations } from "../hooks/useGetActiveImplementations.hook";
import { AnimatePresence } from "framer-motion";
import PullRequestCard from "./github/PullRequestCard";
import EmptyState from "./EmptyState";
import { useMondayTasks } from "../hooks/useMondayTasks";
import MondayTaskCard from "./monday/MondayTaskCard";

const implementedServices = ['github', 'monday'];

const Dashboard = () => {
    const [filterTab, setFilterTab] = useState<string>('mine');
    const [serviceTab, setServiceTab] = useState<string>('all');

    const { github, monday } = useGetActiveImplementations(implementedServices);
    const { owned, toReview, ownedError, toReviewError, error } = useGhPullRequests();
    const { data } = useMondayTasks();

    const handleServiceTabChange = (value: string): void => setServiceTab(value);
    const handleFilterChange = (value: string): void => setFilterTab(value);

    const renderAll = () => {
        const pullRequests = !github
            ? <EmptyState type='github' />
            : owned.map((pr, index) => {
                const props = { ...pr, index };
                return <PullRequestCard key={index} {...props} />
            });

        const mondayTasks = !monday
            ? <EmptyState type='monday' />
            : !data || data.tasks.length === 0 
                ? <  >No data</>
                : data.tasks.map((task, index) => {
                    const props = { ...task, index };
                    return  <MondayTaskCard key={index} {...props} ></MondayTaskCard>
                });

        return (
            <>
                <div className="flex items-center gap-3 mb-2 border-b pb-4">
                    <h1 className="text-2xl font-bold tracking-tight drop-shadow">Monday Tasks</h1>
                </div>
                {mondayTasks}
                <div className="flex items-center gap-3 mb-2 mt-20 border-b pb-4">
                    <h1 className="text-2xl font-bold tracking-tight drop-shadow">Github Pull Requests</h1>
                </div>
                {pullRequests}
            </>
        );
    }

    const renderPRs = () => {
        const PRsToRender = filterTab === 'mine' ? owned : toReview;
        if (PRsToRender.length === 0) return <EmptyState type="github-empty" />

        return PRsToRender.map((pr, index) => {
            const props = { ...pr, index };
            return <PullRequestCard key={index}  {...props} />
        });
    };

    const renderMondayTasks = () => {
        return data && data.tasks.length > 0 && data.tasks.map((task, index) => {
            const props = { ...task, index };
            return <MondayTaskCard key={index} {...props} />
        })
    }

    return (
        <div className="relative">
            <div className="relative w-full">
                <div className="flex justify-between items-center w-full mb-4">
                    <div className="w-1/4">
                        <Tabs value={serviceTab} defaultValue="all" className="w-full" onValueChange={handleServiceTabChange}>
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger
                                    value="all"
                                    className="dark:data-[state=active]:bg-black data-[state=active]:text-white transition-all duration-300 ease-in-out"
                                >
                                    All </TabsTrigger>
                                <TabsTrigger
                                    value="github"
                                    className="dark:data-[state=active]:bg-black data-[state=active]:text-white transition-all duration-300 ease-in-out"
                                >
                                    Github
                                </TabsTrigger>
                                <TabsTrigger
                                    value="monday"
                                    className="dark:data-[state=active]:bg-black data-[state=active]:text-white transition-all duration-300 ease-in-out"
                                >
                                    Monday
                                </TabsTrigger>

                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="w-1/4 transition-all duration-300 ease-in-out">
                        <Tabs value={filterTab} defaultValue="mine" className={`w-full ${serviceTab === 'github' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out  animate-in fade-in-0`} onValueChange={handleFilterChange}>
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
                    </div>
                </div>

                <div className="w-full">
                    <Tabs value={serviceTab} defaultValue="all" className="w-full">
                        <TabsContent value="all" className="flex flex-col gap-4">
                            {
                                error
                                    ? <EmptyState type="all" />
                                    : (<AnimatePresence> {renderAll()} </AnimatePresence>)}
                        </TabsContent>
                        <TabsContent value="github" className="flex flex-col gap-4">
                            {
                                !github  // Si no hay github, mostramos activar github
                                    ? <EmptyState type="github" />
                                    : error
                                        ? <p>{error}</p> // Si hay error, mostramos el error
                                        : (<AnimatePresence>{renderPRs()}</AnimatePresence>)
                            }
                        </TabsContent>
                        <TabsContent value="monday">
                            {
                                !monday  // Si no hay monday, mostramos activar monday
                                    ? "a"
                                    : error
                                        ? <p>{error}</p> // Si hay error, mostramos el error
                                        : (<AnimatePresence>{renderMondayTasks()}</AnimatePresence>)
                            }
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;