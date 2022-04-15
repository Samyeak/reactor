import React, { useState } from "react";
import Button from "../UI/Button";
import InputBox from "../UI/InputBox";

export const NewUser = ({onAddUser}) => {
    const defaultState = {
        username: "",
        age: ""
    };
    const [userDetails, setUserDetails] = useState(defaultState);

    const changeHandler = (event) => {
        setUserDetails((prev)=>{
            return {...prev, [event.target.name]: event.target.value};
        })
    };

    const addUserHandler = (event) => {
        event.preventDefault();
        if(!userDetails.username.trim()){
            return;
        }else if(!userDetails.age || Number(userDetails.age) < 1 || isNaN(userDetails.age)){
            return;
        }
        console.log('userDetails', userDetails);
        onAddUser(userDetails);
        clearForm();
    }

    const clearForm = () => {
        setUserDetails(defaultState);
    }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg">
      <form onSubmit={addUserHandler}>
        <div className="grid">
          <label className="block text-sm font-medium">User Name</label>
          <InputBox name="username" value={userDetails.username} onChange={changeHandler} />
        </div>
        <div className="grid mt-2">
          <label className="block text-sm font-medium">Age</label>
          <InputBox name="age" value={userDetails.age} onChange={changeHandler}/>
        </div>
        <div className="mt-2">
            <button className="w-full bg-teal-400 rounded-sm shadow-sm text-white block font-medium p-1 active:bg-teal-500">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
