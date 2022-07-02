import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { User } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<null | User>(
    authService.currentUser
  );
  console.log(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} bom pheed</footer>
    </>
  );
}

export default App;
