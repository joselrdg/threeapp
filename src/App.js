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
        <Stars />
        <OrbitControls />
        <ambientLight intensity={0.5} />

      </Canvas>
    </div>
  );
}
