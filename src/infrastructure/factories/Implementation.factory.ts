import { AxiosDatasourceImpl } from "../datasources/axios.datasource.impl";


type HeadersProvider = () => string 

export class ImplementationFactory {
    static createApiDatasource(headersProvider: HeadersProvider): any {
        return new AxiosDatasourceImpl(headersProvider());
    }
}