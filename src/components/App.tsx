import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { User } from "firebase/auth";
import { useEffect } from "react";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<null | User | boolean>(
    authService.currentUser
  );
  const [userObj, setUserObj] = useState<null | User>(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log("app", user);
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} bom pheed</footer>
    </>
  );
}

export default App;
