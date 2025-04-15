import { Badge } from "@/components/ui";





const GhLabel = ({ label }: { label: { name: string, color: string } }) => {
    const hasEnoughContrast = (hexColor: string) => {
        // Convert hex to RGB
        const r = parseInt(hexColor.substring(0, 2), 16);
        const g = parseInt(hexColor.substring(2, 4), 16);
        const b = parseInt(hexColor.substring(4, 6), 16);
        
        // Calculate relative luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Return true if the color is dark enough to be visible on white
        return luminance < 0.7;
    };

    const hasContrast = hasEnoughContrast(label.color);
    const textColor = hasContrast ? `#${label.color}` : '#6e6e6e';
    const backgroundColor = hasContrast ? `#${label.color}2f` : '#f0f0f0';

    return (
        <Badge
            className="text-xs capitalize"
            style={{
                color: textColor,
                backgroundColor,
            }}
        >
            {label.name}
        </Badge>
    );
};


export default GhLabel;