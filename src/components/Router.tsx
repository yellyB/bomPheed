import { User } from "firebase/auth";
import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";

interface IProps {
  isLoggedIn: null | User;
}

const AppRouter = ({ isLoggedIn }: IProps) => {
  return (
    <Router>
      <Routes>
        <Route />
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
