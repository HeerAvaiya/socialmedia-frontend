import React, { useState } from "react";

const PasswordInput = ({ label, ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4">
      {label && <label className="block mb-1">{label}</label>}
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          {...props}
          className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-2 text-sm text-gray-600"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
