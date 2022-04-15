import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";

const ModelOverlay = ({ title, message, onConfirm }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
    <Card className="relative top-20 mx-auto p-0 w-96 shadow-lg rounded-md">
      <header className="p-3 bg-red-500 rounded-t-xl">
        <h2 className="font-medium text-white">{title}</h2>
      </header>
      <div className="p-3">{message}</div>
      <div className="p-3 mt-2">
        <button
          onClick={onConfirm}
          className="bg-blue-600 text-white rounded-md px-8 py-1 text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Ok
        </button>
      </div>
    </Card>
  </div>
);

const ErrorModel = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModelOverlay {...props} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default ErrorModel;
