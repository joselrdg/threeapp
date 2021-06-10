import "./App.css";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Reflector,
  Text,
  useTexture,
  useGLTF,
} from "@react-three/drei";
import {
  Physics,
  useBox,
  usePlane,
  useRaycastVehicle,
} from "@react-three/cannon";
import { useControls } from "./hooks/useControls";

const vl = 10;

function VideoText({ clicked, ...props }) {
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/drei.mp4",
      crossOrigin: "Anonymous",
      loop: true,
    })
  );
  useEffect(() => void (clicked && video.play()), [video, clicked]);
  return (
    <Text font="/Inter-Bold.woff" fontSize={3} letterSpacing={-0.06} {...props}>
      drei
      {/* <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial> */}
    </Text>
  );
}

function Box({
  radius = 0.7,
  width = 1.2,
  height = -0.04,
  front = 1.3,
  back = -1.15,
  steer = 0.75,
  force = 2000,
  maxBrake = 1e5,
  ...props
}) {
  const [ref, api] = useBox(() => ({ mass: 1 }));
  const controls = useControls();


  useFrame((state, delta) => {
    const { forward, backward, left, right, brake, reset } = controls.current;
    if (forward && left) {
      api.velocity.set(-vl, 0, vl);
    state.camera.position.copy(ref.current.position);
    } else if (forward && right) {
      api.velocity.set(-vl, 0, -vl);
    state.camera.position.copy(ref.current.position);
    } else if (backward && left) {
      api.velocity.set(vl, 0, vl);
    state.camera.position.copy(ref.current.position);
    } else if (backward && right) {
      api.velocity.set(vl, 0, -vl);
    state.camera.position.copy(ref.current.position);
    } else if (forward) {
      api.velocity.set(-vl, 0, 0);
    state.camera.position.copy(ref.current.position);
    } else if (backward) {
      api.velocity.set(vl, 0, 0);
    state.camera.position.copy(ref.current.position);
    } else if (left) {
      api.velocity.set(0, 0, vl);
    state.camera.position.copy(ref.current.position);
    } else if (right) {
      api.velocity.set(0, 0, -vl);
      state.camera.position.copy(ref.current.position);
    }
  });

  return (
    <mesh
      onPointerMove={(e) => {
        console.log(e);
        api.velocity.set(0, 10, 0);
      }}
      ref={ref}
    >
      <sphereBufferGeometry attach="geometry" args={[0.5, 64, 64]} />
      <meshStandardMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

// function Plane() {
//   return (
//     <mesh position={[0,0,0]} rotation={[-Math.PI,0,0]}>
//       <planeBufferGeometry attach="geometry" arg={[100,100,100]}/>
//       <meshStandardMaterial attach="material" color="lightblue" />
//     </mesh>
//   );
// }

function Plane({ color, ...props }) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));
  return (
    <mesh receiveShadow castShadow {...props}>
      <boxBufferGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// function Plane(props) {
//   const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
//   return (
//     <mesh ref={ref}>
//       <planeBufferGeometry attach="geometry" args={[100, 100]} />
//     </mesh>
//   );
// }

// function Cube(props) {
//   const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }));
//   return (
//     <mesh ref={ref}>
//       <boxBufferGeometry attach="geometry" />
//     </mesh>
//   );
// }

export default function App() {
  const [clicked, setClicked] = useState(true);
  const [ready, setReady] = useState(true);
  const store = { clicked, setClicked, ready, setReady };
  return (
    <div id="canvas-container">
      <div className="bg" />
      <h1 className="text">
        Hi! <span style={{ fontSize: "0.9em" }}>I'm</span>
        <br />
        <span>Jose</span>
      </h1>
      <Canvas
        linear
        mode="concurrent"
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [30, 20, 20], near: 0.01, far: 10000 }}
        onCreated={({ gl, camera }) => {
          console.log(camera);
          // actions.init(camera);
          // gl.toneMapping = THREE.Uncharted2ToneMapping;
          // gl.setClearColor(new THREE.Color("#020209"));
        }}
      >
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        {/* <Jumbo/> */}
        <Physics>
          <VideoText position={[0, 1.3, -2]} />
          <Box />
          <Plane
            color="lightblue"
            rotation-x={-Math.PI / 2}
            position={[0, 0, 0]}
            scale={[400, 400, 0.2]}
          />
        </Physics>
      </Canvas>
    </div>
  );
}
