/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei'
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useSphere, useBox } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber'
import { FPVControls } from './FPVControls';

import { Vector3 } from 'three';


const SPEED = 6;


export default function Model() {
  const {
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    jump,
  } = useKeyboardControls();
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/ok.gltf')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // api.velocity.subscribe((v) => (velocity.current = v));
    actions.Idl.play();
  }, []);

  const dirRot = useRef(0)
  if (moveForward && moveLeft) {
    dirRot.current = 1.5
  } else if (moveForward && moveRight) {
    dirRot.current = -2.5
  } else if (moveBackward && moveLeft) {
    dirRot.current = 0.5
  } else if (moveBackward && moveRight) {
    dirRot.current = -1
  } else if (moveForward) {
    dirRot.current = 2.5
  } else if (moveBackward) {
    dirRot.current = 0
  }  else if (moveLeft) {
    dirRot.current = 1
  }  else if (moveRight) {
    dirRot.current = -1.5
  }

  return (

    <group ref={group} dispose={null} position={[0, 0, 0]}>
      {/* <FPVControls /> */}

      {/* <group name="Camera" position={[0, 300, -600]} rotation={[Math.PI / 2, 0, 0]}>
        <PerspectiveCamera fov={40} near={10} far={1000} />
      </group> */}
      <group rotation={[Math.PI / 2, 0, dirRot.current]} scale={[0.01, 0.01, 0.01]}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh geometry={nodes.Ch46.geometry} material={materials.Ch46_body} skeleton={nodes.Ch46.skeleton} />
      </group>
    </group>
  )
}

useGLTF.preload('/ok.gltf')
