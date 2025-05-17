import { motion } from "framer-motion";

const SkeletonCard = () => (
    <motion.div
    >

        <div className="relative overflow-hidden animate-pulse rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col gap-3 py-3 px-3 mb-1">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_4s_infinite] pointer-events-none" style={{ zIndex: 1 }} />

            {/* Header: status badge, toggle, external link */}
            <div className="flex items-center justify-end gap-1 mb-1 relative">
                <div className="w-3 h-3 rounded-full bg-muted" />
                <div className="h-4 w-10 rounded bg-muted" />
                <div className="h-4 w-12 rounded bg-primary/10" />
            </div>

            {/* Title skeleton */}
            <div className="h-4 w-1/2 bg-muted rounded mb-1" />

            {/* Description skeleton */}
            <div className="h-3 w-1/3 bg-muted rounded mb-1" />
            <div className="h-2 w-2/3 bg-muted/70 rounded mb-1" />
            <div className="h-2 w-1/2 bg-muted/60 rounded mb-1" />
            <div className="h-2 w-full bg-muted/50 rounded" />

            <style jsx>{`
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `}</style>
        </div>
    </motion.div >
);

export default SkeletonCard;