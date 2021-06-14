import "./App.css";
import React, { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Reflector,
  Text,
  useTexture,
  useGLTF,
  PerspectiveCamera
} from "@react-three/drei";
import {
  Physics,
  useBox,
  usePlane,
  useRaycastVehicle,
} from "@react-three/cannon";
import { useControls } from "./hooks/useControls";
// import Text from "./three/components/Text";
import Roboto from './Roboto_Bold.json';
import Track from './three/components/track'
import Textito from './three/components/Text'
import Rig from './three/components/Rig'


function Cam({ position, text, nmass = 0 }) {

  return (
    <group>
      <Texto position={[0, 6.5, 0]} text='Hi!' />
      <Texto position={[12, 0, -50]} text={`I'm José`} />
      <Texto position={[12, -6.5, -100]} text={`I'm development web`} />
    </group>
  )
}

function Texto({ position, text, nmass = 0 }) {
  // const ref = useRef()
  const [ref, api] = useBox(() => ({ mass: nmass }));
  console.log(api)
  useFrame(({ clock }) => {
    ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.3;
    if (clock.oldTime > 300) {
      api.mass.set(1)
    }
    
  })
  return (
    <group ref={ref}>
      <Textito hAlign="right" position={position} children={text} />
    </group>
  )
}

const vl = 10;

function Rigs({ children }) {
  const outer = useRef()
  const inner = useRef()
  useFrame((state, delta) => {
    let { clock } = state;
    state.camera.focus = 50
    if (outer.current && inner.current) {
      outer.current.position.y = THREE.MathUtils.lerp(outer.current.position.y, 8, 0.01)
      inner.current.rotation.y = Math.sin(clock.getElapsedTime() / 8) * Math.PI
      inner.current.position.z = 10 + -Math.sin(clock.getElapsedTime() / 2) * 20
      inner.current.position.y = -5 + Math.sin(clock.getElapsedTime() / 2) * 20
    }
  })
  return (
    <group position={[0, -100, 0]} ref={outer}>
      <group ref={inner}>{children}</group>
    </group>
  )
}



function VideoText({ clicked, texto, ...props }) {

  return (
    <Text font="/Inter-Bold.woff" fontSize={3} letterSpacing={-0.06} {...props}>
      {texto}
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
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [30, 20, 20], near: 0.01, far: 10000 }}
        onCreated={({ gl, camera }) => {
          // actions.init(camera);
          // gl.toneMapping = THREE.Uncharted2ToneMapping;
          // gl.setClearColor(new THREE.Color("#020209"));
        }}
      >
        <Rigs>
          <PerspectiveCamera makeDefault position={[0, 0, 16]} fov={100}>

          </PerspectiveCamera>
        </Rigs>
        <Stars />
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        {/* <Jumbo/> */}
        <Suspense fallback={null}>
          <Physics>
            <Cam />

            <Box />
            {/* <VideoText position={[0, 1.3, -2]} texto={`Hi! I'm Jose`} /> */}
            {/* <Textree position={[0, 1.3, -2]} texto={`Hi! I'`}  /> */}
            {/* <VideoText position={[+15, -1.4, -2]} texto={`My world is app development`} /> */}
            {/* <Plane
            color="lightblue"
            rotation-x={-Math.PI / 2}
            position={[0, 0, 0]}
            scale={[400, 400, 0.2]}
          /> */}
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
