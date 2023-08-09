import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import './App.css'
import { XR, XRButton } from '@react-three/xr'

function Box(props) {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => (meshRef.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(_event) => setActive(!active)}
      onPointerOver={(_event) => setHover(true)}
      onPointerOut={(_event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'pink' : 'orange'} />
    </mesh>
  )
}

function App() {
  let boxes = []

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      boxes.push(<Box position={[x * 1.5, y * 1.5, 0]} />)
    }
  }

  return (
    <>
      <XRButton mode='VR'/>
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <XR>
          <PerspectiveCamera makeDefault position={[5, 5, 10]} />
          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <>
          {boxes}
          </>
        </XR>
      </Canvas>
    </>
  )
}



export default App
