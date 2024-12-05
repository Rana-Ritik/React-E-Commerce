import React, { createContext, useState, useEffect } from 'react';

let UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage or sessionStorage (or a token check)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // You can make an API request to fetch user data or decode the token
      const userFromToken = JSON.parse(localStorage.getItem("user"));
      setUser(userFromToken);
    }
  }, []);

  // Function to set user in context (during login)
  const makeUser = (userObj) => {
    setUser(userObj);
    if (userObj) {
     
      localStorage.setItem("user", JSON.stringify(userObj)); // Store the user data
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  return (
    <UserContext.Provider value={{ user, makeUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
