




export interface ApiDatasource {
    get(url: string): Promise<any>;
    get getToken(): string;
}