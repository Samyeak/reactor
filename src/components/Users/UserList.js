import React from 'react'

const UserList = ({users}) => {
    if(users && users.length > 0){
        return (
          <ul>
              {users.map(user=> (
                  <li key={user.username}>
                      {user.username} ({user.age} years old)
                  </li>
              ))}
          </ul>
        )
    }else{
        return <div>No users found</div>;
    }
}

export default UserList;