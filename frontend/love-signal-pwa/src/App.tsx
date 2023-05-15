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
import { useEffect, useState } from "react";

import "./firebase";
import { getFCMToken } from "./firebase";
import { useRecoilState } from "recoil";
import { kid, myMemberUUID } from "./atom/member";
import { sendFCMToken } from "./api/pwa";
import { myatk } from "./atom/member";
import { fcmToken } from "./atom/fcm";

function App() {
  const [token, setToken] = useRecoilState<string>(fcmToken);
  const [UUID, _] = useRecoilState<string>(myMemberUUID);
  const [atk, __] = useRecoilState<string>(myatk);
  const [kID, ___] = useRecoilState<string>(kid);

  useEffect(() => {
    if (UUID && UUID.length > 0) {
      getFCMToken()
        .then((token) => {
          setToken(token);
          sendFCMToken(UUID, atk, kID, token);
        })
        .catch((err) => {
          console.error("토큰을 발급하는 중 오류 발생 : ", err);
        });
    }
  }, [UUID]);

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
