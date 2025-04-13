import { ImplementationsRepository } from "@/domain/repositories/implementations.repository";





export class GetIsImplementationActive {
    constructor(
        private readonly implementationRepository: ImplementationsRepository
    ) { }

    async execute(implementationToCheck: string): Promise<boolean> {
        const implementation = await this.implementationRepository.getIsImplementationActive(implementationToCheck);

        return implementation;
    }
}