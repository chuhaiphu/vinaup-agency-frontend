import React from 'react';

export default function VinaupLocationIcon({
  fill = '#007042',
  size = 28,
  className,
}: {
  fill?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="mask0_1624_10"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="30"
        height="30"
      >
        <g transform="translate(2.2272, 1)">
          <path
            d="M4.09471 20.4086C1.87333 21.1605 0.5 22.199 0.5 23.3461C0.5 25.6404 5.99455 27.5 12.7728 27.5C19.5511 27.5 25.0457 25.6404 25.0457 23.3461C25.0457 22.199 23.6717 21.1605 21.451 20.4086"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.7728 21.9619C12.7728 21.9619 20.7501 16.0799 20.7501 9.27996C20.7501 4.43098 17.1787 0.5 12.7728 0.5C8.36681 0.5 4.79541 4.43098 4.79541 9.27996C4.79541 16.0799 12.7728 21.9619 12.7728 21.9619Z"
            fill="white"
            stroke="white"
            strokeLinejoin="round"
          />
          <path
            d="M12.7728 12.9615C13.5865 12.9615 14.3669 12.5969 14.9424 11.9477C15.5177 11.2985 15.841 10.418 15.841 9.49997C15.841 8.5819 15.5177 7.70143 14.9424 7.05226C14.3669 6.40309 13.5865 6.03839 12.7728 6.03839C11.9591 6.03839 11.1786 6.40309 10.6032 7.05226C10.0278 7.70143 9.70459 8.5819 9.70459 9.49997C9.70459 10.418 10.0278 11.2985 10.6032 11.9477C11.1786 12.5969 11.9591 12.9615 12.7728 12.9615Z"
            fill="black"
            stroke="black"
            strokeLinejoin="round"
          />
        </g>
      </mask>
      <g mask="url(#mask0_1624_10)">
        <path
          d="M-2 -3H32V32H-2V-3Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}
