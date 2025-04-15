import { ApiDatasource } from "@/domain/datasources/api.datasource";
import { ImplementationsRepository } from "@/domain/repositories/implementations.repository";





export class ImplementationsRepositoryImpl implements ImplementationsRepository {

    constructor(
        private readonly api: ApiDatasource
    ) { }
    
    async activateImplementation(implementation: string): Promise<void> {
        await this.api.activateImplementation(implementation);
    }

    async getIsImplementationActive(implementation: string): Promise<boolean> {
        return this.api.getIsImplementationActive(implementation);
    }
}
