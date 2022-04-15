import React, { useState } from "react";
import NewUser from "./NewUser";
import UserList from "./UserList";

export const User = () => {
    const [users, setUsers] = useState([{username: "Test", age: 23}]);

    const addUserHandler = (newUser) => {
        setUsers((prev)=>[newUser, ...prev]);
    }
  return (
    <>
      <h1>User</h1>
      <NewUser onAddUser={addUserHandler}/>
      <UserList users={users}/>
    </>
  );
};
