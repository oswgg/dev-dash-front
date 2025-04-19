import { GetIsImplementationActive } from "@/application/getActiveImplementation";
import { ImplementationsRepositoryImpl } from "@/infrastructure/repositories/implementations.repository.impl";
import { useEffect, useState } from "react"
import { useAuth } from "../context/auth.context";
import { ImplementationFactory } from "@/infrastructure/factories/Implementation.factory";





export const useGetActiveImplementations = (implementationsToCheck: string[]) => {
    const [implementations, setImplementations] = useState<{ [key: string]: boolean }>({});
    const { setAuthError } = useAuth();

    const apiClient = ImplementationFactory.createApiDatasource('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmFmYzE0NWYyNmY0NjE0NWE5NmZhNiIsImlhdCI6MTc0NTA0MDk4MiwiZXhwIjoxNzQ3NjMyOTgyfQ.NfqVT1azfqNWCwaEqf9Wj8S1gi60tzF1jnGFNbWF80U');
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