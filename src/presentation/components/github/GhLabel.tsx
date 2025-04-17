import { Badge } from "@/components/ui";





const GhLabel = ({ label }: { label: { name: string, color: string } }) => {

    const textColor = `#${label.color}` ;
    const backgroundColor = `#${label.color}2f`;

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