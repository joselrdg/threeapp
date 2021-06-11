
import * as THREE from "three";



function Rig({ children }) {
    const outer = useRef()
    const inner = useRef()
    const main = useRef()
    useFrame(({ camera, clock }) => {
      if (outer.current && inner.current) {
        outer.current.position.y = THREE.MathUtils.lerp(outer.current.position.y, 0, 0.05)
        inner.current.rotation.y = Math.sin(clock.getElapsedTime() / 8) * Math.PI
        inner.current.position.z = 5 + -Math.sin(clock.getElapsedTime() / 2) * 10
        inner.current.position.y = -5 + Math.sin(clock.getElapsedTime() / 2) * 2


        main.current.position.z = Math.sin(clock.getElapsedTime() * 40) * Math.PI * 0.2
        main.current.rotation.z += (mouse.x / 500 - main.current.rotation.z) * 0.2
        main.current.rotation.x += (-mouse.y / 1200 - main.current.rotation.x) * 0.2
        main.current.rotation.y += (-mouse.x / 1200 - main.current.rotation.y) * 0.2
        main.current.position.x += (mouse.x / 10 - main.current.position.x) * 0.2
        main.current.position.y += (25 + -mouse.y / 10 - main.current.position.y) * 0.2
      }
    })
    return (
      <group position={[0, -100, 0]} ref={outer}>
        <group ref={inner}>{children}</group>
      </group>
    )
  }