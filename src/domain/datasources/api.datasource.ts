




export interface ApiDatasource {
    get(url: string): Promise<any>;
    post(url: string, data: any): Promise<any>;
    get Token(): string;
}