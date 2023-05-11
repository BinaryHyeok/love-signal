import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Heart } from "./Heart";

const color = 0xffffff;
const intensity = 1;

const Ground = () => {
  return (
    <>
      <Canvas
        camera={{
          fov: 30,
          near: 5,
          aspect: window.innerWidth / window.innerHeight,
          far: 1000,
          position: [0, 1, 5],
        }}
      >
        <pointLight color={color} intensity={intensity} />
        <directionalLight color={color} intensity={intensity} />
        <ambientLight color={color} intensity={intensity} />
        <OrbitControls
          autoRotate={true}
          autoRotateSpeed={15}
          enablePan={true}
          enableZoom={false}
          enableRotate={true}
        />
        <Suspense fallback={null}>
          <Heart />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Ground;
