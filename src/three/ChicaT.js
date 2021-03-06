/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import { useFrame } from '@react-three/fiber'

export default function Model({ run }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/ChicaT.gltf')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions.OrcIdle.play();
  }, []);
  
  if (actions.OrcIdle) {
    if (run) {
      actions.Running.stop()
      actions.OrcIdle.play()
    } else {
      actions.OrcIdle.stop();
      actions.Running.play()
    }
  }
  return (
    <group ref={group} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]}>
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

useGLTF.preload('/ChicaT.gltf')
