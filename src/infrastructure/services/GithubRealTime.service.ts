import { GhPullRequest } from "@/domain/entities/gh-pull-request.entity";
import { GhPullRequestMapper } from "../mappers/gh-pull-request.mapper";
import { SocketDatasource } from "@/domain/datasources/socket.datasource";



export class GithubRealTimeService {
    constructor(
        private readonly socketClient: SocketDatasource
    ) { }

    subscribeToNewPullRequest(callback: (pr: GhPullRequest) => void) {
        this.socketClient.on('new-pull-request', (data: any) => {
            const newPullRequest = GhPullRequestMapper.fromObjectToEntity(data);
            newPullRequest.internal_status = 'new';
            callback(newPullRequest);
        });
    }
    
    subscribeToUpdatedPullRequest(callback: (data: any) => void) {
        this.socketClient.on('updated-pull-request', (data: any) => {
            const updated = GhPullRequestMapper.fromObjectToEntity(data);

            if (     updated.state === 'closed' && !updated.isMerged) updated.internal_status = 'closed';
            else if (updated.state === 'closed' && updated.isMerged) updated.internal_status = 'merged';
            else     updated.internal_status = 'updated';
            
            callback(updated);
        });
    }
    unsubscribeToNewPullRequest() {
        this.socketClient.off('new-pull-request');
    }
    
    unsubscribeToUpdatedPullRequest() {
        this.socketClient.off('updated-pull-request');
    }

}