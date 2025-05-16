import { AxiosDatasourceImpl } from "../datasources/axios.datasource.impl";





export class MondayFactory {
    static createApiDatasource(token: string): any {
        return new AxiosDatasourceImpl(token);
    }
}