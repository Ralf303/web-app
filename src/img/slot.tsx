import React from "react";

interface Props {
  pathname: string;
}

export function SlotSvg(props: Props) {
  return (
    <svg
      version="1.1"
      className={`${props.pathname === "/clicker" ? "active" : ""}`}
      style={{ height: "25%", width: "25%" }}
      viewBox="0 0 32 32"
    >
      <path
        className="st0"
        d="M25,29H1V9c0-3.3,2.7-6,6-6h12c3.3,0,6,2.7,6,6V29z"
      />
      <rect x="9" y="11" className="st0" width="8" height="10" />
      <rect x="1" y="11" className="st0" width="8" height="10" />
      <rect x="17" y="11" className="st0" width="8" height="10" />
      <line className="st0" x1="9" y1="25" x2="16" y2="25" />
      <circle className="st0" cx="29" cy="5" r="2" />
      <polyline className="st0" points="25,19 29,19 29,7 " />
      <path className="st0" d="M4,14h2l-0.6,0.6C4.5,15.5,4,16.7,4,18v0" />
      <path className="st0" d="M12,14h2l-0.6,0.6C12.5,15.5,12,16.7,12,18v0" />
      <path className="st0" d="M20,14h2l-0.6,0.6C20.5,15.5,20,16.7,20,18v0" />
    </svg>
  );
}
