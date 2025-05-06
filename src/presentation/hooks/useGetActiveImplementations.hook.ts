import { GetIsImplementationActive } from "@/application/getActiveImplementation";
import { ImplementationsRepositoryImpl } from "@/infrastructure/repositories/implementations.repository.impl";
import { useEffect, useState } from "react"
import { useAuth } from "../context/auth.context";
import { ImplementationFactory } from "@/infrastructure/factories/Implementation.factory";





export const useGetActiveImplementations = (implementationsToCheck: string[]) => {
    const [implementations, setImplementations] = useState<{ [key: string]: boolean }>({});
    const { setAuthError, getAuthHeader } = useAuth();

    const apiClient = ImplementationFactory.createApiDatasource(getAuthHeader);
    const implementationsRepository = new ImplementationsRepositoryImpl(apiClient);
    const getIsImplementationActive = new GetIsImplementationActive(implementationsRepository);

    const fetchData = async () => {
        try {
            const fetched = await Promise.all(implementationsToCheck.map(
                async (impl) => ({ [impl]: await getIsImplementationActive.execute(impl) })
            ))

            setImplementations(fetched.reduce((acc, curr) => ({ ...acc, ...curr }), {}));
        } catch (error: any) {
            if (error.status === 401) {
                setAuthError("Your session has expired. Please login again.");
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return implementations;
}