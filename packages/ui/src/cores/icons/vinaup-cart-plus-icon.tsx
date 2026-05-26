import * as React from "react"

export default function VinaupCartPlusIcon({
    fill = "#C44C50",
    size = 30,
    className,
}: {
    fill?: string;
    size?: number | string;
    className?: string;
}) {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            className={className}
        >
            <path
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h5.455l4.09 16.828c.128.622.47 1.18.969 1.577.498.397 1.12.607 1.759.594h12.273a2.735 2.735 0 0 0 1.758-.594c.498-.396.841-.955.969-1.577L31 6.428H7.818M13 29a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM26 29a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            />
            <path
                fill={fill}
                d="M18.866 16.484v-5.897h1.338v5.897h-1.338Zm-2.28-2.28v-1.338h5.898v1.338h-5.897Z"
            />
        </svg>
    )
}