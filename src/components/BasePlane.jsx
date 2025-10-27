import { useRef } from 'react'
import BaseMaterial from '../materials/BaseMaterial.jsx'
import { useControls } from 'leva'

export default function BasePlane() 
{
  const self = useRef()

  const { transitionProgress } = useControls({
    transitionProgress:
    {
      label: ' Transition Progress',
      value: 0.6,
      min: 0,
      max: 1,
      step: 0.01
    }
  })

  return (
    <mesh ref={ self } >
        <planeGeometry
            args={ [ 7, 7, 64, 64 ] }
        />
        <BaseMaterial revealProgress={ transitionProgress } />
    </mesh>
  )
}
