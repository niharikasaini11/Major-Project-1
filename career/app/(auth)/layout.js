// app/(auth)/layout.js (The new centering logic)

import React from "react";

const AuthLayout = ({ children }) => {
  return (
    // 💡 NEW: Use a container that spans the entire screen, but the children are centered absolutely
    <div className="relative w-full min-h-screen"> 
      
      {/* 💡 ABSOLUTE CENTERING FOR THE FORM */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;