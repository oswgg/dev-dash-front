import { GhPullRequest } from "@/domain/entities/gh-pull-request";
import { useGhPullRequests } from "@/presentation/hooks/useGhPullRequests.hook";
import { useGetActiveImplementations } from "../hooks/useGetActiveImplementations.hook";




const Home = () => {
    const { github } = useGetActiveImplementations(['github']);
    const { PRs: ghPullRequests } = useGhPullRequests();
    
    return (
        <div>
            {
                !github
                    ? <p>User has no github implementation</p>
                    : ghPullRequests && ghPullRequests.map((ghPullRequest: GhPullRequest) => {
                        return (
                            <div key={ghPullRequest.id}>
                                <a href={ghPullRequest.url}>{ghPullRequest.title}</a>
                            </div>
                        );
                    })
            }
        </div>
    );
}

export default Home
