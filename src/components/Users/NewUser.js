import React, { useState } from "react";
import Card from "../UI/Card";
import ErrorModel from "../UI/ErrorModel";
import InputBox from "../UI/InputBox";

const NewUser = ({ onAddUser }) => {
  const defaultState = {
    username: "",
    age: "",
  };
  const [userDetails, setUserDetails] = useState(defaultState);
  const [error, setError] = useState();
  // const usernameRef = useRef();

  const changeHandler = (event) => {
    setUserDetails((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    // console.log('usernameRefValue', usernameRef.current.value);
    if (!userDetails.username.trim()) {
      setError({
        title: "Invalid username",
        message: "Please enter a valid username.",
      });
      return;
    } else if (
      !userDetails.age ||
      Number(userDetails.age) < 1 ||
      isNaN(userDetails.age)
    ) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (age > 0).",
      });
      return;
    }
    console.log("userDetails", userDetails);
    onAddUser(userDetails);
    clearForm();
  };

  const clearForm = () => {
    setUserDetails(defaultState);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModel
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card>
        <h1>Add New User</h1>
        <form onSubmit={addUserHandler}>
          <div className="grid">
            <label className="block text-sm font-medium">User Name</label>
            <InputBox
              name="username"
              value={userDetails.username}
              onChange={changeHandler}
            />
          </div>
          <div className="grid mt-2">
            <label className="block text-sm font-medium">Age</label>
            <InputBox
              name="age"
              value={userDetails.age}
              onChange={changeHandler}
            />
          </div>
          <div className="mt-2">
            <button className="bg-green-500 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
              Add User
            </button>
          </div>
        </form>
        </Card>
    </>
  );
};

export default NewUser;
