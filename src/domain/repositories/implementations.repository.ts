




export interface ImplementationsRepository {
    getIsImplementationActive(implementation: string): Promise<boolean>;
}