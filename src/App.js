import "./App.css";
import React, { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useLoader, useFrame, } from "@react-three/fiber";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import {
  OrbitControls,
  Stars,
  Reflector,
  Text,
  useTexture,
  useGLTF,
  PerspectiveCamera,
  useHelper,
  useAnimations,
  Html
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
import Ok from './three/Ok.js'
import { Player } from './three/Player'
import { Joystick } from 'react-joystick-component';
import { ZeroFactor } from "three";
import Groundpark from './Groundpark';







const Ground = (xF,zF,) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeBufferGeometry arg={[xF, zF]} />
      <meshPhongMaterial />
    </mesh>
  )
}


export default function App() {
  const joyRef = useRef({y: 30, x: 3})
  const stopJoyState = useRef(true)
  // const [stopJoyState, setStopJoyState] = useState(true)

  const moveJoy = (e) => {
    joyRef.current = e
    stopJoyState.current = (false)
  }

  const stopJoy = (e) => {
    stopJoyState.current = (true)
  }

  return (
    <>

      <div id="canvas-container">
        <Canvas
          linear
          shadows
          dpr={[1, 1.5]}
          gl={{ antialias: false }}
          camera={{ name: 'cma', position: [1000, 2000, 2000], near: 0.01, far: 10000 }}
        >
          <Suspense fallback={null} >
            <hemisphereLight arg={[0xffffff, 0x444444]} position={[0, 200, 0]} />
            <Physics>
              <Groundpark/>
              <ambientLight intensity={0.5} />
              <OrbitControls/>
              <Player moveJoystick={joyRef} stopJoystick={stopJoyState}/>
            </Physics>
          </Suspense>
        </Canvas>
      </div>
      <div className="joystick">
        <Joystick size={100} baseColor="red" stickColor="blue" move={moveJoy} stop={stopJoy}/>
      </div>
    </>
  );
}
