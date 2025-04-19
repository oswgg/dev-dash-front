import { AxiosDatasourceImpl } from "../datasources/axios.datasource.impl";
import { SocketIOClient } from "../datasources/socket-io.datasource.impl";



export class GithubFactory {
    static createApiDatasource(token: string): any {
        return new AxiosDatasourceImpl(token);
    }
    
    static createSocketDatasource(url: string): any {
        return new SocketIOClient(url);
    }
}