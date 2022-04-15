import React from "react";
import Card from "../UI/Card";

const UserList = ({ users }) => {
  if (users && users.length > 0) {
    return (
      <Card>
        <h3 className="font-semibold text-gray-600">Users</h3>
        <hr />
        <hr />
        <ul>
          {users.map((user) => (
            <>
              <li key={user.username} className="p-1">
                <span className="text-sm font-medium text-gray-600">
                  {user.username}
                </span>
                <span className="text-sm text-gray-600">
                  {" "}
                  ({user.age} years old)
                </span>
              </li>
              <hr />
            </>
          ))}
        </ul>
      </Card>
    );
  } else {
    return <div>No users found</div>;
  }
};

export default UserList;
