import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'



const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <div className='webgl-container'>

    <Canvas
        camera={ {
            fov: 45,
            near: 1,
            far: 100,
            position: [ 0, 0, 10 ]
        } }

        gl={{
            antialias: true,
            alpha: true,
        }}
    >   

        <ambientLight intensity={ 0.8 } color='#ffffff' />

        <fog attach="fog" args={['#141414', 5, 20]} />
        
        <Experience />

    </Canvas>
    </div>
)