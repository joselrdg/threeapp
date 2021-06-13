import React from 'react'
import * as THREE from 'three'
import { Curves } from 'three/examples/jsm/curves/CurveExtras'

export default function Track() {
  let spline = new Curves.GrannyKnot()
  let track = new THREE.TubeBufferGeometry(spline, 250, 0.2, 10, true)
  let scale= 15
  return (
    <mesh scale={[scale, scale, scale]} geometry={track}>
      <meshBasicMaterial color="indianred" />
    </mesh>
  )
}