import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "@react-three/drei";
import MatchHeart from "./MatchHeart";

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

const MatchGround = () => {
  return (
    <>
      <Canvas camera={camera}>
        <pointLight color={color} intensity={intensity} />
        <directionalLight color={color} intensity={intensity} />
        <ambientLight color={color} intensity={intensity} />
        <OrbitControls
          autoRotate={true}
          autoRotateSpeed={15}
          enablePan={true}
          enableZoom={true}
          enableRotate={false}
        />
        <Suspense fallback={null}>
          <MatchHeart />
        </Suspense>
      </Canvas>
    </>
  );
};

export default MatchGround;
