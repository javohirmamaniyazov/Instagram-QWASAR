import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import useAuthListener from './Listeners/AuthListener';
import * as ROUTE from "./components/routes";
import Layout from "./Models/SectionModel.js";
import UserContext from "./components/UserProfile/userStatus";
import ProtectedRoute from "./Helpers/ProtectedRoute";
import IsUserLoggedIn from "./Helpers/IsUserLoggedIn";
import EditUserPage from "./Pages/UserPage/UpdateUserPage";
import ReactLoading from 'react-loading';
import './App.css';



const Login = React.lazy(() => import("./Pages/AuthPage/Sign_In.js"));
const SignUp = React.lazy(() => import("./Pages/AuthPage/Sign_Up.js"));
const HomePage = React.lazy(() => import("./Pages/HomePage/HomePage"));
const UserPage = React.lazy(() => import("./Pages/UserPage/UserProfilePage"));
const ForgotPassword = React.lazy(() => import("./Pages/AuthPage/ForgotPassword"));



function App() {
  const { user } = useAuthListener();
  return (
    <>
      <UserContext.Provider value={{ user }} className="csroll">
        <BrowserRouter>
          <React.Suspense fallback={(
            <div className="flex items-center justify-center h-screen">
              <ReactLoading type={"spin"} color={"#000"} height={'5%'} width={'5%'} />
            </div>
          )}>
            <Routes>
              <Route
                path={ROUTE.HOME}
                element={
                  <ProtectedRoute user={user}>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<HomePage />} />
                <Route path={ROUTE.PROFILE} element={<UserPage />} />
                <Route path={ROUTE.EDIT_PROFILE} element={<EditUserPage />} />
              </Route>
              <Route
                path={ROUTE.LOGIN}
                element={
                  <IsUserLoggedIn user={user}>
                    <Login />
                  </IsUserLoggedIn>
                }
              />
              <Route
                path={ROUTE.FORGOTPASSWORD}
                element={
                  <IsUserLoggedIn user={user}>
                    <ForgotPassword />
                  </IsUserLoggedIn>
                }
              />
              <Route
                path={ROUTE.SIGN_UP}
                element={
                  <IsUserLoggedIn>
                    <SignUp />
                  </IsUserLoggedIn>
                }
              />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
