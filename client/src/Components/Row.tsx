import React from "react";

export function AppRow(props: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-row items-center ${props.className || ""}`}>
      {props?.children}
    </div>
  );
}
