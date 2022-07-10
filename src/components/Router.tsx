import { User } from "firebase/auth";
import { useState } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

interface IProps {
  isLoggedIn: null | User | boolean;
  userObj: null | User;
}

const AppRouter: React.FC<IProps> = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        <Route />
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
        {/* <Route path="/*" element={<Navigate to="/"></Navigate>}></Route> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
