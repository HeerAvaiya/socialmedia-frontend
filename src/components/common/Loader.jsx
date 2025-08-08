import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin" />
        </div>
    );
};

export default Loader;