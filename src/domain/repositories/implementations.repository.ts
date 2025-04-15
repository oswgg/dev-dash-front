




export interface ImplementationsRepository {
    activateImplementation(implementation: string): Promise<void>;
    getIsImplementationActive(implementation: string): Promise<boolean>;
}