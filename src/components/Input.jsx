import React from "react";

const Input = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1">{label}</label>}
      <input
        {...props}
        className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
