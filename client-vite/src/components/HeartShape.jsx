import { useMemo } from 'react'
import * as THREE from 'three'

export function HeartGeometry() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const x = 0, y = 0
    
    shape.moveTo(x + 5, y + 5)
    shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y)
    shape.bezierCurveTo(x - 6, y, x - 6, y + 3.5, x - 6, y + 3.5)
    shape.bezierCurveTo(x - 6, y + 5.5, x - 4, y + 7.7, x, y + 10)
    shape.bezierCurveTo(x + 4, y + 7.7, x + 6, y + 5.5, x + 6, y + 3.5)
    shape.bezierCurveTo(x + 6, y + 3.5, x + 6, y, x + 5, y + 5)
    
    return new THREE.ExtrudeGeometry(shape, {
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.5,
      bevelThickness: 0.5
    })
  }, [])
  
  return <primitive object={geometry} />
}