import { Canvas, useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import './App.css'
import { XR, XRButton } from '@react-three/xr'
import { useState } from 'react'

function AntNest(props) {
  const obj = useLoader(OBJLoader, props.objUrl)

  return (
    <mesh {...props}>
      <primitive object={obj} />
    </mesh>
  )
}

function Selector(props) {
  const objects = ['/58.obj', '/64_new.obj', '/82.obj', '/84.obj', '/146_new.obj', '/146_old.obj', '/155.obj', '/178.obj', '/220_moved.obj', '/223_new.obj', '/223_old.obj', '/285_new.obj', '/285_old.obj', '/290_new.obj', '/290_old.obj']
  const options = objects.map((obj) => <option key={obj} value={obj}>{obj}</option>)
  const onSelected = props.onSelected || (() => {})

  return (
    <label>
      Choose an Ant Nest:
      <select
        onChange={(event) => { onSelected(event.target.value)} }
      >
        {options}
      </select>
    </label>
  )
}

function App() {
  const [objUrl, setObjUrl] = useState('/58.obj')

  return (
    <>
      <Selector onSelected={ (newObjUrl) => {setObjUrl(newObjUrl)}} />
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <XR>
          <PerspectiveCamera makeDefault position={[0, 0, 1]} />
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <pointLight position={[2, 2, 2]} power={100} />
          <AntNest objUrl={objUrl} />
        </XR>
      </Canvas>
      <XRButton mode='VR' />
    </>
  )
}

export default App
