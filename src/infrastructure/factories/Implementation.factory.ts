import { AxiosDatasourceImpl } from "../datasources/axios.datasource.impl";





export class ImplementationFactory {
    static createApiDatasource(token: string): any {
        return new AxiosDatasourceImpl(token);
    }
}