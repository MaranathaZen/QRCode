import React from "react";

function Header() {
  return (
    <div className="w-full p-5 flex items-center justify-between bg-black text-white">
      <div className="flex items-center gap-3">
        <div className="h-full text-[2rem]">QR</div>
        <div>
          <div>CODE</div>
          <div>INDO</div>
        </div>
      </div>
      <div>v.1.0.0</div>
    </div>
  );
}

export default Header;
