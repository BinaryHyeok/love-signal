import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const MatchHeart = (props: any) => {
  const group = useRef();
  const { nodes, materials, animations }: any = useGLTF("/models/heart2.glb");

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions.anim3;
    action?.play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="d4d038b4883b4502b3afc86c52263e17fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="pCube4" position={[0, 0, 0]}>
                  <mesh
                    name="0"
                    castShadow
                    receiveShadow
                    geometry={nodes["0"].geometry}
                    material={materials.phong1}
                    morphTargetDictionary={nodes["0"].morphTargetDictionary}
                    morphTargetInfluences={nodes["0"].morphTargetInfluences}
                    position={[12, 0, 7]}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default MatchHeart;

useGLTF.preload("/heart.glb");
