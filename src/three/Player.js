import { useThree, useFrame } from '@react-three/fiber'


import React, { useEffect, useRef } from 'react';
import { useSphere, useBox } from '@react-three/cannon';
import {
  PerspectiveCamera, useAnimations, useGLTF, useHelper,
} from "@react-three/drei";
import { FPVControls } from './FPVControls';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Vector3, BoxHelper, Euler } from 'three';
// import ChicaT from './ChicaT'
import { Joystick } from 'react-joystick-component';

const SPEED = 6;

const ChicaT = (rotationZ) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/ChicaT.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.Ch46.geometry}
          material={materials['Ch46_body.001']}
          skeleton={nodes.Ch46.skeleton}
        />
      </group>
    </group>
  )
}

export const Player = ({ moveJoystick, stopJoystick }) => {
  const { camera } = useThree();
  const {
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    jump,
  } = useKeyboardControls();
  // const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }))
  const [ref, api] = useSphere(() => ({
    mass: 0,
    type: 'Dynamic',
    // ...props,
  }));

  const velocity = useRef([0, 0, 0]);
  const rotacionPlayerRef = useRef(0)
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  useHelper(ref, BoxHelper, 'cyan')


  useFrame(() => {
    // const {camera} = state
    // camera.position.copy(ref.current.position);
    const camaraVect = new Vector3(ref.current.position.x + 3, ref.current.position.y + 8, ref.current.position.z + 6)
    camera.position.copy(camaraVect);

    const direction = new Vector3(
      !stopJoystick.current ? (moveJoystick.current.x / 50) : 0,
      0,
      !stopJoystick.current ? (moveJoystick.current.y / -50) : 0
    );

    if (moveJoystick.current.direction === 'RIGHT' && direction.z === 0) {
      api.rotation.set(0, 2.5, 0)
    } else if (moveJoystick.current.direction === 'LEFT' && direction.z === 0) {
      api.rotation.set(0, 3, 0)
    } else if (direction.z > 0){
      api.rotation.set(0, direction.x, 0)
    } else if (direction.z < 0){
      api.rotation.set(0, -3 - (direction.x), 0)
    }

      // if (direction.x > 0) {
      //   api.rotation.set(0, direction.x + 6.6 , 0)
      // }

      // const euler = new Euler(direction.x,0, direction.y)
      // direction.applyEuler(euler)
      //     direction.multiplyScalar(SPEED)

      api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 8, velocity.current[2]);
    }

  });
  const PlayerT = ChicaT(rotacionPlayerRef.current)

  return (
    <>
      {/* <FPVControls /> */}
      <mesh ref={ref} >
        {/* <boxBufferGeometry /> */}
        <ChicaT />
      </mesh>
    </>
  );
};

