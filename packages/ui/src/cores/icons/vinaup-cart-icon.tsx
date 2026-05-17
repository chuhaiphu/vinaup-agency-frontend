import * as React from "react"

export default function VinaupCartIcon({
    fill = "#01233A",
    size = 30,
    className,
}: {
    fill?: string;
    size?: number | string;
    className?: string;
}) {

    const width = typeof size === 'number' ? (size * 35) / 33 : 'auto';
    return (
        <svg
            width={width}
            height={size}
            viewBox="0 0 35 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M1.25 1.25H7.09416L11.4773 19.3669C11.6139 20.0369 11.9811 20.6377 12.515 21.0648C13.0489 21.492 13.7157 21.7184 14.3994 21.7046H27.5487C28.2323 21.7184 28.8991 21.492 29.433 21.0648C29.9669 20.6377 30.3342 20.0369 30.4708 19.3669L33.3929 7.09416H8.55519"
                stroke={fill}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.1071 31.2499C15.8823 31.2499 17.3214 29.8108 17.3214 28.0356C17.3214 26.2604 15.8823 24.8213 14.1071 24.8213C12.3319 24.8213 10.8928 26.2604 10.8928 28.0356C10.8928 29.8108 12.3319 31.2499 14.1071 31.2499Z"
                stroke={fill}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M28.0356 31.2499C29.8108 31.2499 31.2499 29.8108 31.2499 28.0356C31.2499 26.2604 29.8108 24.8213 28.0356 24.8213C26.2604 24.8213 24.8213 26.2604 24.8213 28.0356C24.8213 29.8108 26.2604 31.2499 28.0356 31.2499Z"
                stroke={fill}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}