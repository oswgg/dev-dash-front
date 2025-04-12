import { GhPullRequest } from "@/domain/entities/gh-pull-request";
import { AxiosDatasourceImpl } from "@/infrastructure/datasources/axios.datasource.impl";
import { GithubRepositoryImpl } from "@/infrastructure/repositories/github.repository.impl";
import { useEffect, useState } from "react";




const Home = () => {

    const [ghPullRequests, setGhPullRequests] = useState<GhPullRequest[] | null>(null);

    useEffect(() => {
        const getPullRequests = async () => {
            const axioClient = new AxiosDatasourceImpl('a')
            const ghPullRequestsa = await (new GithubRepositoryImpl(axioClient).getPullRequests());

            setGhPullRequests(ghPullRequestsa);
        }

        getPullRequests();
    }, []);
    
    return (
        <div>
            <h1>Hello World</h1>
            {
                ghPullRequests && ghPullRequests.map((ghPullRequest: GhPullRequest) => {
                    return (
                        <div key={ghPullRequest.id}>
                            <h2>{ghPullRequest.title}</h2>
                            <p>{ghPullRequest.url}</p>
                        </div>
                    );
                })
            }
        </div>
    );

}

export default Home
