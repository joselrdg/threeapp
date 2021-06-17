import { useThree, useFrame } from '@react-three/fiber'


import React, { useEffect, useRef } from 'react';
import { useSphere, useBox } from '@react-three/cannon';
import { FPVControls } from './FPVControls';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Vector3 } from 'three';
import Ok from './Ok'

const SPEED = 6;

export const Player = (props) => {
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
    ...props,
  }));

  let tal = camera.rotation.z
  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  useFrame(() => {
    // camera.position.copy(ref.current.position);
    const camaraVect = new Vector3(ref.current.position.x,ref.current.position.y + 3, ref.current.position.z+3)
    camera.position.copy(camaraVect);
    

    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0),
    );
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0,
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 8, velocity.current[2]);
    }
    if(moveForward){
      tal = -1
    }
  });
  return (
    <>
      <FPVControls />
      <mesh ref={ref} >
        <Ok moveForward={moveForward}
    moveBackward={moveBackward}
    moveLeft={moveLeft}
    moveRight={moveRight} />

      </mesh>
    </>
  );
};

