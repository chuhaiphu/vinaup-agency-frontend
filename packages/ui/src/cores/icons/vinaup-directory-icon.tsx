import React from 'react';

export default function VinaupDirectoryIcon({
    fill = "#005230",
    size = 18,
    className,
}: {
    fill?: string;
    size?: number | string;
    className?: string;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M18.7895 0H3.31579C2.70789 0 2.21053 0.495 2.21053 1.1V5.5H0V7.7H2.21053V9.9H0V12.1H2.21053V14.3H0V16.5H2.21053V20.9C2.21053 21.505 2.70789 22 3.31579 22H18.7895C20.0053 22 21 21.01 21 19.8V2.2C21 0.99 20.0053 0 18.7895 0ZM11.6053 5.5C13.1858 5.5 14.3684 6.677 14.3684 8.25C14.3684 9.823 13.1858 11 11.6053 11C10.0247 11 8.8421 9.823 8.8421 8.25C8.8421 6.677 10.0247 5.5 11.6053 5.5ZM16.5789 16.5H6.63158V15.4C6.63158 13.574 8.11263 12.1 9.94737 12.1H13.2632C15.0979 12.1 16.5789 13.574 16.5789 15.4V16.5Z"
                fill={fill}
            />
        </svg>
    );
}
