import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/pages/Main/Main";
import P_SignUp from "./components/pages/SignUp/P_SignUp";
import Login from "./components/Login/Login";
import Manual from "./components/Manual/Manual";
import ExploreTeam from "./components/pages/OtherGender/ExploreTeam";
import FindTeam from "./components/pages/FindTeam/FindTeam";
import TeamBuild from "./components/pages/TeamBuild/TeamBuild";
import MyTeam from "./components/pages/MyTeam/MyTeam";
import Mypage from "./components/pages/Mypage/Mypage";
import RootLayout from "./components/pages/Common/RootLayout";
import Chat from "./components/pages/Chat/Chat";
import NotFound from "./components/pages/Common/NotFound";
import ContentLayout from "./components/pages/Common/ContentLayout";
import Ground from "./components/UI/Three/Ground";
import Test from "./components/pages/Test";
import { AnimatePresence } from "framer-motion";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Main /> },
        {
          path: "/Signup",
          element: <P_SignUp />,
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
          path: "/Test",
          element: <Ground />,
        },
        {
          path: "/Test2",
          element: <Test />,
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
          ],
        },
        {
          path: "/*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <AnimatePresence>
      <RouterProvider router={router} />;
    </AnimatePresence>
  );
}

export default App;
