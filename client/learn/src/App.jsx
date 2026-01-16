/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */

import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, PrefetchPageLinks } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "@mantine/core/styles.css";
import { Toaster } from "sonner";
import { fetchProduct } from "./redux/Slice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
// import Homepage from "./pages/Homepage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Preferences from "./pages/Prefrences";
import LoadingSpinner from "./components/LoadingSpinner";
import PreferenceProtectRoute from "./components/preferenceProtectRoute";
import Footer from "./components/Footer";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AboutPage from "./components/AboutPage";
import NewsPage from "./pages/NewsPage";

const Homepage = lazy(() => import("./pages/Homepage"));
const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
  return (
    <div>
      <Navbar />

      <Toaster />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route element={<PreferenceProtectRoute />}>
              <Route path="/Preferences " element={<Preferences />} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ResetPassword" element={<ResetPasswordPage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;

// import React from "react";
// import { useState } from "react";
// import "@mantine/core/styles.css";
// import { Button } from "@mantine/core";
// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "./redux/Slice/counterSlice";
// const App = () => {
//   // const [count, setCount] = useState(0);
//   const { count } = useSelector((state) => state.count);
//   const dispatch = useDispatch();
//   return (
//     <div>
//       <p>{count}</p>
//       <Button onClick={() => dispatch(increment())}>increment</Button>

//       <Button
//         onClick={() => {
//           dispatch(decrement());
//         }}
//       >
//         Deincrement
//       </Button>

//       {/* <Button
//         onClick={() => {
//           setCount(0);
//         }}
//       >
//         reset
//       </Button> */}
//     </div>
//   );
// };

// export default App;
