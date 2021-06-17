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
  useHelper, useAnimations
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
import {Player} from './three/Player'






const Ground = () => {

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeBufferGeometry arg={[10000, 10000]} />
      <meshPhongMaterial />
    </mesh>
  )
}



export default function App() {
  return (
    <div id="canvas-container">
      <Canvas
        linear
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [30, 20, 20], near: 0.01, far: 10000 }}
      // onCreated={({ gl, camera }) => {
      // actions.init(camera);
      // gl.toneMapping = THREE.Uncharted2ToneMapping;
      // gl.setClearColor(new THREE.Color("#020209"));
      // }}
      >
        <PerspectiveCamera fov={40} near={10} far={1000} />
        <Suspense fallback={null} >
          {/* <Stars /> */}
          <OrbitControls />
          <hemisphereLight arg={[0xffffff, 0x444444]} position={[0, 200, 0]} />
          <Physics>
          <Ground />
          <ambientLight intensity={0.5} />
          <Player />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
