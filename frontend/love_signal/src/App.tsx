import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import Main from "./components/pages/Main/Main";
import SignUp from "./components/pages/SignUp/SignUp";
import Login from "./components/Login/Login";
import Manual from "./components/Manual/Manual";
import ExploreTeam from "./components/pages/OtherGender/ExploreTeam";
import FindTeam from "./components/pages/FindTeam/FindTeam";
import TeamBuild from "./components/pages/TeamBuild/TeamBuild";
import MyTeam from "./components/pages/MyTeam/MyTeam";
import Mypage from "./components/pages/Mypage/Mypage";
import RootLayout from "./components/pages/Common/RootLayout";
import Chat from "./components/pages/Chat/Chat";
import Codepen from "./components/UI/Loading/LoadingSpinner";
import NotFound from "./components/pages/Common/NotFound";
import ContentLayout from "./components/pages/Common/ContentLayout";

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
          path: "/",
          element: <ContentLayout />,
          children: [
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
              element: <TeamBuild />,
            },
            {
              path: "/SameGender/MyTeam",
              element: <MyTeam />,
            },
            {
              path: "/Chat",
              element: <Chat />,
            },
            {
              path: "/Mypage",
              element: <Mypage />,
            },
            {
              path: "/loading",
              element: <Codepen />,
            },
          ],
        },
        {
          path: "/*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
