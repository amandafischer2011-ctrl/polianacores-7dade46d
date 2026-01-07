import { cn } from "@/lib/utils";

interface CategoryIconProps {
    icon: string | null;
    className?: string;
}

const CategoryIcon = ({ icon, className }: CategoryIconProps) => {
    const isHexColor = icon?.startsWith('#');

    if (isHexColor) {
        return (
            <div
                className={cn("relative inline-flex items-center justify-center", className)}
                title="Cor da categoria"
            >
                <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full drop-shadow-sm"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Cap/Handle - Sleek rounded cylinder */}
                    <path
                        d="M8.5 2C8.5 1.45 8.95 1 9.5 1H14.5C15.05 1 15.5 1.45 15.5 2V10C15.5 10.55 15.05 11 14.5 11H9.5C8.95 11 8.5 10.55 8.5 10V2Z"
                        fill="#1a1a1a"
                    />
                    {/* Handle Highlight for 3D effect */}
                    <path
                        d="M14 2V10"
                        stroke="#333"
                        strokeWidth="1"
                        strokeLinecap="round"
                        opacity="0.5"
                    />

                    {/* Stem connecting handle to brush */}
                    <rect x="11" y="11" width="2" height="3" fill="#555" />

                    {/* Brush Bristles - Tapered and rounded bottom */}
                    <path
                        d="M10 14H14L13.8 17.5C13.7 18.9 13 20 12 20C11 20 10.3 18.9 10.2 17.5L10 14Z"
                        fill={icon || '#ff0000'}
                    />

                    {/* Glossy/Wet Paint Shine on the bristles */}
                    <path
                        d="M12.5 15C12.5 15 13 16 13 17"
                        stroke="white"
                        strokeWidth="1"
                        strokeLinecap="round"
                        opacity="0.4"
                    />

                    {/* Optional: A drop dripping from the tip if it's very wet */}
                    <path
                        d="M12 20C12 20 11.5 21 12 22C12.5 21 12 20 12 20Z"
                        fill={icon || '#ff0000'}
                    />
                </svg>
            </div>
        );
    }

    return (
        <span className={cn("inline-block", className)} role="img" aria-label="category icon">
            {icon || '💅'}
        </span>
    );
};

export default CategoryIcon;
