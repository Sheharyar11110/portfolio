import { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import { useRef } from 'react'

function MiniOrb() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.1
  })

  return (
    <Float speed={1} floatIntensity={0.5}>
      <mesh ref={ref} scale={0.6}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshTransmissionMaterial
          transmission={0.95}
          thickness={0.3}
          roughness={0.05}
          color="#e8e6e3"
          chromaticAberration={0.03}
        />
      </mesh>
    </Float>
  )
}

export default function ContactAmbient() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-40 pointer-events-none hidden lg:block">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 3, 2]} intensity={0.6} />
          <MiniOrb />
        </Suspense>
      </Canvas>
    </div>
  )
}
