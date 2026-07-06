import * as React from "react"

export default function VinaupSupplierIcon({
    fill = "#245975",
    size = 42,
    className,
}: {
    fill?: string;
    size?: number | string;
    className?: string;
}) {
    // The icon's aspect ratio is 18/25 (width/height). 
    // We treat `size` as the height, and calculate width to maintain the ratio.
    const calculatedWidth = typeof size === 'number' ? size * (18 / 25) : `calc(${size} * 18 / 25)`;

    return (
        <svg
            width={calculatedWidth}
            height={size}
            viewBox="0 0 18 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect
                y={25}
                width={16.25}
                height={7.5}
                rx={3.75}
                transform="rotate(-90 0 25)"
                fill={fill}
            />
            <rect
                x={10.5}
                y={24.5}
                width={15.25}
                height={6.5}
                rx={3.25}
                transform="rotate(-90 10.5 24.5)"
                stroke={fill}
            />
            <circle
                cx={3.75}
                cy={3.75}
                r={3.25}
                transform="rotate(-90 3.75 3.75)"
                stroke={fill}
            />
            <circle
                cx={13.75}
                cy={3.75}
                r={3.75}
                transform="rotate(-90 13.75 3.75)"
                fill={fill}
            />
        </svg>
    )
}