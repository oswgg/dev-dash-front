import { ApiDatasource } from "@/domain/datasources/api.datasource";
import { ImplementationsRepository } from "@/domain/repositories/implementations.repository";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ImplementationsRepositoryImpl implements ImplementationsRepository {

    constructor(
        private readonly api: ApiDatasource
    ) { }
    
    async activateImplementation(implementation: string): Promise<void> {
        const state = encodeURIComponent(window.location.href);
        window.location.href = `${BASE_URL}/implementations/${implementation}/activate?returnTo=${state}&token=${this.api.Token}`;
    }

    async getIsImplementationActive(implementation: string): Promise<boolean> {
        const data = await this.api.get(`/implementations/${implementation}`)
        if (!data) {
            return false;
        }

        return data.active;
    }
}
