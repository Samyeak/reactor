import React from "react";

const InputBox = ({name, value, onChange}) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 p-2 focus:ring-green-500 focus:border focus:border-green-500 block w-full shadow-sm sm:text-sm border border-black-800 rounded-md"
    />
  );
};

export default InputBox;
