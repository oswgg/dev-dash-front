import { motion } from "framer-motion";
import { MondayTask } from "@/domain/entities/monday-task.entity";


interface MondayTaskCardProps extends MondayTask {
    index: number;
}


const MondayTaskCard = (props: MondayTaskCardProps) => {
    const { board, name, status, index } = props;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeOut"
            }}
        >
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col gap-2 p-4 transition hover:shadow-md">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{board}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium
                    ${status === "Done" ? "bg-green-100 text-green-800" :
                            status === "Working on it" ? "bg-yellow-100 text-yellow-800" :
                                status === "Stuck" ? "bg-red-100 text-red-800" :
                                    "bg-gray-100 text-gray-800"}
                `}>
                        {status}
                    </span>
                </div>
                <div className="text-base font-bold text-primary break-words">{name}</div>
            </div>
        </motion.div>
    );
}


export default MondayTaskCard;