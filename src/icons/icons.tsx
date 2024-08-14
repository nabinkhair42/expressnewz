import React from "react";

interface IconsProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  color?: string;
}

export const NepaliRupee: React.FC<IconsProps> = ({
  width = 100,
  height = 100,
  ...props
}) => (
  <svg id="rupee" width={width} height={height} {...props}>
    <path
      fill="#FFBF00"
      d="M24,5A19,19,0,1,0,43,24,19,19,0,0,0,24,5Zm-.29,26.71A1,1,0,0,1,23,32a1,1,0,0,1-.71-.29l-6-6A1,1,0,0,1,17,24H19a3,3,0,0,0,3.05-3A3,3,0,0,0,19,18H16a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2H23a4.83,4.83,0,0,1,1,2.94,5,5,0,0,1-4.61,5l4.32,4.34A1,1,0,0,1,23.71,31.71Zm10-3.51a1,1,0,0,1-1.41,0l-4.44-4.39a1.08,1.08,0,0,0-1.54,0,1,1,0,0,0-.32.75,1.05,1.05,0,0,0,.32.76l.73.73a1,1,0,0,1-1.4,1.42l-.74-.73a3.05,3.05,0,0,1,0-4.35,3.09,3.09,0,0,1,4.36,0l4.43,4.39A1,1,0,0,1,33.71,28.2Z"
    ></path>
    <path
      fill="#FFBF00"
      d="M24,48A24,24,0,1,1,48,24,24,24,0,0,1,24,48ZM24,2A22,22,0,1,0,46,24,22,22,0,0,0,24,2Z"
    ></path>
  </svg>
);

export const Gold: React.FC<IconsProps> = ({
  width = 100,
  height = 100,
  ...props
}) => (
  <svg fill="#FFBF00" viewBox="0 0 32 32" height={40}>
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <path d="M11.652 19.245l-0.001-0.001-0.005-0.003zM30.671 16.098l-2.207-5.839-8.022-4.361-16.624 8.861-2.431 6.495 9.8 5.214 0.161-7.067-7.624-4.353 0.654 0.346-0.373-0.215 1.332 0.708-1.212-0.708 7.526 4.065 16.205-8.376-2.594 1.424 3.037-1.551-6.011 3.183-10.434 5.727-0.668 6.816 19.484-10.371zM11.976 17.206l-4.389-2.342 4.269 1.32 13.070-5.8-12.95 6.822z"></path>
  </svg>
);

export const Silver: React.FC<IconsProps> = ({
  width = "100",
  height = "100",
  ...props
}) => (
  <svg fill="#C0C0C0" viewBox="0 0 32 32" height={40}>
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <path d="M11.652 19.245l-0.001-0.001-0.005-0.003zM30.671 16.098l-2.207-5.839-8.022-4.361-16.624 8.861-2.431 6.495 9.8 5.214 0.161-7.067-7.624-4.353 0.654 0.346-0.373-0.215 1.332 0.708-1.212-0.708 7.526 4.065 16.205-8.376-2.594 1.424 3.037-1.551-6.011 3.183-10.434 5.727-0.668 6.816 19.484-10.371zM11.976 17.206l-4.389-2.342 4.269 1.32 13.070-5.8-12.95 6.822z"></path>
  </svg>
);
