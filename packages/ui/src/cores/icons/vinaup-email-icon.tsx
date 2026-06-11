import * as React from "react"

export default function VinaupEmailIcon({
    fill = "#FF5532",
    size = 42,
    className,
}: {
    fill?: string;
    size?: number | string;
    className?: string;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={26}
            height={21}
            fill="none"
            className={className}
        >
            <path
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="m6.361 6.393 4.792 3.857a2.545 2.545 0 0 0 3.194 0l4.792-3.857m5.111 10.286V3.82a2.58 2.58 0 0 0-.748-1.818 2.548 2.548 0 0 0-1.808-.753H3.806c-.678 0-1.328.27-1.808.753a2.58 2.58 0 0 0-.748 1.818V16.68c0 .682.27 1.336.748 1.818.48.482 1.13.753 1.808.753h17.888c.678 0 1.328-.27 1.808-.753a2.58 2.58 0 0 0 .748-1.818Z"
            />
        </svg>
    )
}