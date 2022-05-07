import React from "react";

const InputBox = ({name, value, onChange, type, className, isValid, ...otherParams}) => {
  const invalidClasses = isValid === false && "border-red-500";
  return (
    <input
      type= {type ?? "text"}
      name={name}
      value={value}
      onChange={onChange}
      className={`mt-1 p-2 block w-full shadow-sm sm:text-sm border-2 border-black-800 rounded-md ${invalidClasses} ${className}`}
      {...otherParams}
    />
  );
};

export default InputBox;
