import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import vertex from '../shaders/vertex.glsl'
import fragment from '../shaders/fragment.glsl'
import { RepeatWrapping, Vector2, Color, ClampToEdgeWrapping } from 'three'
import useMouse from '../hooks/useMouse'

export default function BaseMaterial( {
    texture ='./textures/noise/noiseValueSoft.png',
    helmetTexture = './images/onihelmet.png',
    personTexture = './images/onimain.png',
    depthTexture = './images/onidepth.png',
    maskTexture = './images/onimask.png',
    revealProgress = 0.6,
    ...props
} ) 
{
    const self = useRef()

    const noise = useTexture( texture )
    noise.wrapS = RepeatWrapping
    noise.wrapT = RepeatWrapping

    const textureOniHelmet = useTexture( helmetTexture )
    const textureOniPerson = useTexture( personTexture )
    const textureOniMask = useTexture( maskTexture )
    const textureOniDepth = useTexture( depthTexture )

    // mouse coordinates
    let { x, y } = useMouse()
    
        const halfX = window.innerWidth / 2
        const halfY = window.innerHeight / 2
    
        const tx = ( halfX - x ) / halfX
        const ty = ( halfY - y ) / halfY
    
        x = ( tx - 0 ) * 0.01
        y = ( ty - 0 ) * 0.01

    const uniforms =
    {
        uTime : 0,
        uNoiseTexture : noise,
        uResolution: new Vector2( window.innerWidth, window.innerHeight ),
        uOniHelmetTexture : textureOniHelmet,
        uOniPersonTexture : textureOniPerson,
        uOniMaskTexture : textureOniMask,
        uDepthTexture : textureOniDepth,
        uMouse: new Vector2( x, y ),
        uProgress: revealProgress,
    }

    useFrame( ( state, delta ) =>
    {
        self.current.uniforms.uTime.value += delta

        console.log( self.current.uniforms.uProgress )
    })

    const BaseMaterial = shaderMaterial( uniforms, vertex, fragment )
    extend( { BaseMaterial } )

    return (
        <baseMaterial
            key={ BaseMaterial.key }
            ref={ self }
            {...props}
        />
    )
}