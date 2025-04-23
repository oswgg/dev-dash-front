import { AxiosDatasourceImpl } from "../datasources/axios.datasource.impl";
import { SocketIOClient } from "../datasources/socket-io.datasource.impl";



export class GithubFactory {
    static createApiDatasource(token: string): any {
        return new AxiosDatasourceImpl(token);
    }
    
    static createSocketDatasource(url: string): any {
        return new SocketIOClient(url, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmFmYzE0NWYyNmY0NjE0NWE5NmZhNiIsImlhdCI6MTc0NDUwMTc4MCwiZXhwIjoxNzQ3MDkzNzgwfQ.Haf0QQx2cDCyclZcww7vMbBKFkmEniusPUhBbRIamjk');
    }
}