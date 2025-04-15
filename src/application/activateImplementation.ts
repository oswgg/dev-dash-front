import { ImplementationsRepository } from "@/domain/repositories/implementations.repository";





export class ActivateImplementation {
    constructor(
        private readonly implementationRepository: ImplementationsRepository
    ) { }
    
    async execute(implementation: string): Promise<void> {
        await this.implementationRepository.activateImplementation(implementation);
    }
}