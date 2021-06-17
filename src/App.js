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







const Ground = () => {

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeBufferGeometry arg={[10000, 10000]} />
      <meshPhongMaterial />
    </mesh>
  )
}


export default function App() {
  const joyRef = useRef()
  const stopJoyRef = useRef(true)
  const moveJoy = (e) => {
    joyRef.current = e
    stopJoyRef.current = false
    console.log(joyRef)
  }

  const stopJoy = (e) => {
    stopJoyRef.current = true
    console.log(stopJoyRef)
  }

  return (
    <>

      <div id="canvas-container">
        <Canvas
          linear
          shadows
          dpr={[1, 1.5]}
          gl={{ antialias: false }}
          camera={{ name: 'cma', position: [10, 20, 20], near: 0.01, far: 10000 }}
        // onCreated={({ gl, camera }) => {
        // actions.init(camera);
        // gl.toneMapping = THREE.Uncharted2ToneMapping;
        // gl.setClearColor(new THREE.Color("#020209"));
        // }}
        >
          <Suspense fallback={null} >
            {/* <PerspectiveCamera fov={40} near={10} far={1000} /> */}
            {/* <Stars /> */}
            {/* <OrbitControls /> */}
            <hemisphereLight arg={[0xffffff, 0x444444]} position={[0, 200, 0]} />
            {/* <PerspectiveCamera  ref={myCamera} position={[10, 0, 20]}  fov={40} near={10} far={1000} /> */}
            <Physics>
              <Ground />
              <ambientLight intensity={0.5} />
              <Player />
            </Physics>
          </Suspense>


        </Canvas>
      </div>
      <div className="joystick">
        <Joystick size={100} baseColor="red" stickColor="blue" move={moveJoy} stop={stopJoy}></Joystick>
      </div>
    </>
  );
}
