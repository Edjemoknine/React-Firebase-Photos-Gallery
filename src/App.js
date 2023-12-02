import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";

import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Notfound from "./pages/NotFound.js";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { login, logout } from "./container/Slices/GallerySlice";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.gallery);
  console.log(user);
  useEffect(() => {
    const onsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(login(currentUser));
      } else {
        dispatch(logout(currentUser));
      }
    });
    return () => onsubscribe();
  }, []);

  return (
    <Router>
      <Header />
      <ToastContainer />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          {user && <Route path="/profile" element={<Profile />} />}
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
