import React from "react";

const Ping = () => {
  return (
    <div className="relative flex item-center justify-center">
      <div className="absolute -left-2 -top-1">
        <span className="flex-size-[11px]">
          <span
            className="absolute inline-flex h-3 w-3 top-1.5
            animate-ping
            rounded-full
            bg-primary
            opacity-40"
          ></span>
          <span
            className="absolute inline-flex h-3 w-3 top-1.5
            animate-ping
            rounded-full
            bg-primary
            opacity-75"
          >
            <p>. . </p>
          </span>
          <span className="reative inline-flex size-[11px] rounded-full bg-primary"></span>
        </span>
      </div>
    </div>
  );
};

export default Ping;
