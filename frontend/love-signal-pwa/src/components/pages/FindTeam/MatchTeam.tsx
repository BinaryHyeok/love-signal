import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "@react-three/drei";
import MatchHeart from "../../UI/Three/MatchHeart";
import style from "./styles/MatchGround.module.scss";
import Button_Type_A from "../../atoms/Common/Button_Type_A";
import { useRecoilState } from "recoil";
import { kid, myMemberUUID, myatk, teamBuildState } from "../../../atom/member";
import { matchCancel } from "../../../api/team";

const color = 0xffffff;
const intensity = 1;

const camera = new PerspectiveCamera(
  15,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.zoom = 0.2;
camera.position.set(0, 0, 20);
camera.updateProjectionMatrix();

const MatchTeam = () => {
  const [, setMyTeamBuildState] = useRecoilState<boolean>(teamBuildState);
  const [myUUID] = useRecoilState<string>(myMemberUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  const cancelMatch = () => {
    matchCancel(myUUID, atk, kID)
      .then((res) => {
        //나 매칭 취소됐다는걸 알려줄 axios
        setMyTeamBuildState(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={style.heart}>
      <Canvas camera={camera}>
        <pointLight color={color} intensity={intensity} />
        <directionalLight color={color} intensity={intensity} />
        <ambientLight color={color} intensity={intensity} />
        <OrbitControls
          autoRotate={true}
          autoRotateSpeed={15}
          enablePan={true}
          enableZoom={false}
          enableRotate={false}
        />
        <Suspense fallback={null}>
          <MatchHeart />
        </Suspense>
      </Canvas>
      <div className={style.match}>매칭중입니다.</div>
      <div className={style.cancelBtn}>
        <Button_Type_A width="180px" height="32px" onClick={cancelMatch}>
          매칭취소
        </Button_Type_A>
      </div>
    </div>
  );
};

export default MatchTeam;
