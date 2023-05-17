import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/pages/Main/Main";
import SignUp from "./components/pages/SignUp/SignUp";
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
import { AnimatePresence } from "framer-motion";
import MatchTeam from "./components/templates/FindTeam/MatchTeam";
import Test from "./components/pages/Test";

import "./firebase";

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
          path: "/Manual",
          element: <Manual />,
        },
        {
          path: "/Test",
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
              path: "/SameGender/Build",
              element: <TeamBuild />,
            },
            {
              path: "/SameGender/MyTeam",
              element: <MyTeam />,
            },
            {
              path: "/SameGender/Match",
              element: <MatchTeam />,
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
