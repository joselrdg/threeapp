/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/groundpark.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Terrain.geometry} material={materials.overlay} />
      <mesh geometry={nodes.Terrain_envelope.geometry} material={nodes.Terrain_envelope.material} />
      <mesh geometry={nodes.map_6osm_buildings_1.geometry} material={materials.wall} />
      <mesh geometry={nodes.map_6osm_buildings_2.geometry} material={materials.roof} />
      <mesh geometry={nodes.map_6osm_water.geometry} material={materials.water} position={[0, 55, 0]} />
    </group>
  )
}

useGLTF.preload('/groundpark.gltf')
