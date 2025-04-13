import { ApiDatasource } from "@/domain/datasources/api.datasource";
import { ImplementationsRepository } from "@/domain/repositories/implementations.repository";





export class ImplementationsRepositoryImpl implements ImplementationsRepository {

    constructor(
        private readonly api: ApiDatasource
    ) { }

    async getIsImplementationActive(implementation: string): Promise<boolean> {
        return this.api.getIsImplementationActive(implementation);
    }
}
