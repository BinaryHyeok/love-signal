import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import Main from "./components/Main/Main";
import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import Manual from "./components/Manual/Manual";
import ExploreTeam from "./components/OtherGender/ExploreTeam";
import FindTeam from "./components/SameGender/FindTeam";
import BuildingTeam from "./components/SameGender/BuildingTeam";
import MyTeam from "./components/SameGender/MyTeam";
import Mypage from "./components/Mypage/Mypage";
import RootLayout from "./components/Main/RootLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Main /> },
        {
          path: "/Signup",
          element: <SignUp />,
        },
        {
          path: "/Login",
          element: <Login />,
        },
        {
          path: "/Manual",
          element: <Manual />,
        },
        {
          path: "/OtherGender",
          element: <ExploreTeam />,
        },
        {
          path: "/SameGender",
          element: <FindTeam />,
        },
        {
          path: "/SameGender/build",
          element: <BuildingTeam />,
        },
        {
          path: "/SameGender/MyTeam",
          element: <MyTeam />,
        },
        {
          path: "/Mypage",
          element: <Mypage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
