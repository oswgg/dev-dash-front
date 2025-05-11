import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActivateImplementation } from '@/application/activateImplementation';
import { AxiosDatasourceImpl } from '@/infrastructure/datasources/axios.datasource.impl';
import { ImplementationsRepositoryImpl } from '@/infrastructure/repositories/implementations.repository.impl';
import { motion } from "framer-motion";
import { useAuthContext } from '../context/auth.context';

type EmptyStateProps = 'github' | 'github-empty' | 'all' | 'all-empty';


const EmptyState = ({ type }: { type: EmptyStateProps }) => {
    const { getAuthHeader } = useAuthContext();

    const implRepository = new ImplementationsRepositoryImpl(new AxiosDatasourceImpl(getAuthHeader()));
    const activateImpl = new ActivateImplementation(implRepository);

    const handleActivateImplementation = (impl: string) => {
        activateImpl.execute(impl);
    }

    const EmptyDictionary = {
        'github': (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                    <Github className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No GitHub PRs Connected</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                    Connect your GitHub account to see and track your pull requests in one place.
                </p>
                <Button className="gap-2" onClick={() => handleActivateImplementation("github")}>
                    <Github className="h-4 w-4" />
                    Connect GitHub
                </Button>
            </div>
        ),
        'github-empty': (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                    <Github className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Pull Requests were found</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptatem ratione amet provident, repellendus laborum molestiae dolore totam culpa eius. Natus, perferendis?</p>
                <Button className="gap-2">
                    Refresh
                </Button>
            </div>
        ),
        'all-empty': (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                    <ExternalLink className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Connect Your Accounts</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                    Track all your work in one place by connecting your GitHub and Jira accounts.
                </p>
                <div className="flex gap-3">
                    <Button className="gap-2">
                        <Github className="h-4 w-4" />
                        Connect GitHub
                    </Button>
                    <Button variant="outline">
                        Connect Jira
                    </Button>
                </div>
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