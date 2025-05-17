import { Github } from 'lucide-react';
import { Monday } from './svgs';
import { Button } from '@/components/ui/button';
import { ActivateImplementation } from '@/application/activateImplementation';
import { AxiosDatasourceImpl } from '@/infrastructure/datasources/axios.datasource.impl';
import { ImplementationsRepositoryImpl } from '@/infrastructure/repositories/implementations.repository.impl';
import { motion } from "framer-motion";
import { useAuthContext } from '../context/auth.context';
import { JSX } from 'react';

const PossibleImplementation = { github: 'github', monday: 'monday' } as const;


const EmptyState = ({ type }: { type: keyof typeof PossibleImplementation }) => {
    const { getAuthHeader } = useAuthContext();

    const implRepository = new ImplementationsRepositoryImpl(new AxiosDatasourceImpl(getAuthHeader()));
    const activateImpl = new ActivateImplementation(implRepository);

    const handleActivateImplementation = (impl: string) => {
        activateImpl.execute(impl);
    }

    const EmptyDictionary: { [key in keyof typeof PossibleImplementation]: JSX.Element } = {
        'github': (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                    <Github />
                </div>
                <h3 className="text-lg font-semibold mb-2">No GitHub Connected</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                    Connect your GitHub account to see and track your pull requests in one place.
                </p>
                <Button className="gap-2" onClick={() => handleActivateImplementation("github")}>
                    Connect GitHub
                </Button>
            </div>
        ),
        'monday': (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                    <Monday className="size-8 muted-foreground fill-white stroke-12 stroke-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Monday Connected</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                    Connect your Monday account to see and track your tasks in one place.
                </p>
                <Button className="gap-2" onClick={() => handleActivateImplementation("monday")}>
                    Connect Monday
                </Button>
            </div>
        )
    }


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: "easeOut"
            }}>
            {EmptyDictionary[type]}
        </motion.div>
    );
}

export default EmptyState;