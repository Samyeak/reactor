import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

const MainHeader = () => {
  return (
    <header>
      <h1>Learning React</h1>
      <Navigation />
    </header>
  );
};

const Navigation = () => {
  const authContext = useContext(AuthContext);
  return (
    <nav>
      {authContext.isLoggedIn && (
        <ul>
          <li>Users</li>
          <li>Home</li>
          <li>Logout</li>
        </ul>
      )}
    </nav>
  );
};

export default MainHeader;
