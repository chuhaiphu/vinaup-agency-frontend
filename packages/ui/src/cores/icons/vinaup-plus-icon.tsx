import React from 'react';

export default function VinaupPlusIcon({
    stroke = "#2161b2",
    size = 18,
    className,
}: {
    stroke?: string;
    size?: number | string;
    className?: string;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={stroke}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
        </svg>
    );
}
