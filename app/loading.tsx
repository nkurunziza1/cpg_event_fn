import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="relative w-10 h-10">
        <div className="absolute w-10 h-10 border-2 border-blue-200 rounded-full"></div>
        <div className="absolute w-10 h-10 border-2 border-primary rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-lg text-gray-600 font-medium">Loading...</p>
    </div>
  );
};

export default Loading;
