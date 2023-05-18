import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "@react-three/drei";
import MatchHeart from "../../UI/Three/MatchHeart";
import style from "./styles/MatchGround.module.scss";
import Button_Type_A from "../../atoms/Common/Button_Type_A";
import { useRecoilState } from "recoil";
import { kid, myMemberUUID, myatk, teamBuildState } from "../../../atom/member";
import { matchCancel } from "../../../api/team";
import { motion } from "framer-motion";
import { contentVariants } from "../../atoms/Common/contentVariants";
import Modal_portal from "../../UI/Modal/Modal_portal";
import ModalBox from "../../UI/Modal/Common/ModalBox";
import A_TextHighlight_Blink from "../../atoms/Common/A_TextHighlight_Blink";
import A_TextHighlight from "../../atoms/Common/A_TextHighlight";

const color = 0xffffff;
const intensity = 1;

let timeout: NodeJS.Timer;

const camera = new PerspectiveCamera(
  15,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.zoom = 0.15;
camera.position.set(0, 0, 20);
camera.updateProjectionMatrix();

const MatchTeam = () => {
  const [, setMyTeamBuildState] = useRecoilState<boolean>(teamBuildState);
  const [myUUID] = useRecoilState<string>(myMemberUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);

  const cancelMatch = () => {
    matchCancel(myUUID, atk, kID)
      .then(() => {
        //나 매칭 취소됐다는걸 알려줄 axios
        setMyTeamBuildState(false);
      })
      .catch(() => {});
  };

  const openModal = () => {
    setIsVisible(true);
    setAnimation(false);
    clearTimeout(timeout);
  };

  const closeModal = () => {
    clearTimeout(timeout);
    setAnimation(true);
    timeout = setTimeout(() => setIsVisible(false), 300);
  };

  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      className={style.heart}
    >
      {!isVisible ? (
        <>
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
            <Button_Type_A
              width="180px"
              height="40px"
              onClick={openModal}
              background="#BCC5F0"
            >
              매칭취소
            </Button_Type_A>
          </div>
        </>
      ) : (
        <>
          <Modal_portal>
            <div className={style.container}>
              <div className={style.background} onClick={closeModal}></div>
              <ModalBox
                animation={animation}
                visible={isVisible}
                closeModal={closeModal}
                width="300px"
                height="200px"
              >
                <div className={style.desc}>
                  <div className={`${style.desc3} ${style.bold}`}>
                    정말 매칭을 취소하시겠습니까?
                  </div>
                  <Button_Type_A
                    width="100%"
                    height="40px"
                    background="#BCC5F0"
                    onClick={cancelMatch}
                  >
                    매칭 취소하기
                  </Button_Type_A>
                </div>
              </ModalBox>
            </div>
          </Modal_portal>
        </>
      )}
    </motion.div>
  );
};

export default MatchTeam;
