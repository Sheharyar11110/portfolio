import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei'

function Orb() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Float speed={1.5} floatIntensity={0.8}>
      <mesh ref={ref} scale={0.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshTransmissionMaterial
          transmission={0.95}
          thickness={0.4}
          roughness={0.02}
          color="#7c5cff"
          chromaticAberration={0.06}
        />
      </mesh>
    </Float>
  )
}

export default function ContactAmbient() {
  return (
    <div className="absolute right-0 top-1/3 w-72 h-72 opacity-50 pointer-events-none hidden lg:block">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[2, 2, 2]} intensity={1} color="#22d3ee" />
          <pointLight position={[-2, -1, 1]} intensity={0.6} color="#f472b6" />
          <Orb />
          <Sparkles count={40} scale={4} size={1.5} color="#c4b5fd" />
        </Suspense>
      </Canvas>
    </div>
  )
}
