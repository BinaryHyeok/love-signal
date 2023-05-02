import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main";
import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import Manual from "./components/Manual/Manual";
import ExploreTeam from "./components/OtherGender/ExploreTeam";
import FindTeam from "./components/pages/FindTeam/FindTeam";
import TeamBuilding from "./components/SameGender/TeamBuilding";
import MyTeam from "./components/SameGender/MyTeam";
import Mypage from "./components/Mypage/Mypage";
import RootLayout from "./components/Main/RootLayout";
import Chat from "./components/pages/Chat/Chat";
import Codepen from "./components/UI/Loading/LoadingSpinner";
import NotFound from "./components/pages/NotFound";
import ContentLayout from "./components/pages/ContentLayout";

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
              element: <TeamBuilding />,
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
