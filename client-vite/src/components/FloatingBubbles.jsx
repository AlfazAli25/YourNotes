import { Canvas } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function HeartGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape()
    const x = 0, y = 0
    
    shape.moveTo(x + 5, y + 5)
    shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y)
    shape.bezierCurveTo(x - 6, y, x - 6, y + 3.5, x - 6, y + 3.5)
    shape.bezierCurveTo(x - 6, y + 5.5, x - 4, y + 7.7, x, y + 10)
    shape.bezierCurveTo(x + 4, y + 7.7, x + 6, y + 5.5, x + 6, y + 3.5)
    shape.bezierCurveTo(x + 6, y + 3.5, x + 6, y, x + 5, y + 5)
    
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.2,
      bevelThickness: 0.2
    })
  }, [])
}

function Bubble({ position, scale, speed }) {
  const meshRef = useRef()
  const geometry = HeartGeometry()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += speed
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3
      
      if (meshRef.current.position.y > 10) {
        meshRef.current.position.y = -10
      }
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale * 0.1}>
      <primitive object={geometry} />
      <meshPhongMaterial
        color={new THREE.Color().setHSL(0.85, 0.8, 0.7)}
        transparent
        opacity={0.6}
        shininess={200}
        emissive={new THREE.Color().setHSL(0.85, 0.4, 0.3)}
      />
    </mesh>
  )
}

export default function FloatingBubbles() {
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 20,
      Math.random() * 20 - 10,
      (Math.random() - 0.5) * 20
    ],
    scale: Math.random() * 0.5 + 0.2,
    speed: Math.random() * 0.02 + 0.01
  }))

  return (
    <div className="fixed inset-0 -z-20">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        {bubbles.map((bubble) => (
          <Bubble
            key={bubble.id}
            position={bubble.position}
            scale={bubble.scale}
            speed={bubble.speed}
          />
        ))}
      </Canvas>
    </div>
  )
}