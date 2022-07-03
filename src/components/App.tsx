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

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..."}
      <footer>&copy; {new Date().getFullYear()} bom pheed</footer>
    </>
  );
}

export default App;
