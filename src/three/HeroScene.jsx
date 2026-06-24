import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  Sparkles,
  ContactShadows,
  Stars,
} from '@react-three/drei'
import * as THREE from 'three'
import { useMediaQuery } from '../hooks/useMediaQuery'

const SCALE = 1.6
const COLORS = ['#7c5cff', '#22d3ee', '#f472b6', '#34d399', '#fb923c', '#a78bfa']

function Bubble({ position, scale = 1, color = '#7c5cff', speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.y = t * 0.1
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.15
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.2
  })

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 48, 48]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={128}
          transmission={0.95}
          thickness={0.5}
          roughness={0.02}
          chromaticAberration={0.08}
          anisotropy={0.2}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.12}
          color={color}
          attenuationColor={color}
          attenuationDistance={0.6}
        />
      </mesh>
    </Float>
  )
}

function WireRing({ position, color }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.2
  })
  return (
    <mesh ref={ref} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.2 * SCALE, 0.02, 64, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} wireframe />
    </mesh>
  )
}

function CoreOrb() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.12
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05
    ref.current.scale.setScalar(s)
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.9 * SCALE, 2]} />
      <meshStandardMaterial
        color="#7c5cff"
        emissive="#7c5cff"
        emissiveIntensity={0.4}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  )
}

function SceneContent({ mouse }) {
  const group = useRef()

  const bubblePositions = useMemo(
    () =>
      [
        [-2.5, 0.5, 0],
        [2.2, 0.3, -0.5],
        [-1, -1.2, -1],
        [1.5, 1, -1.5],
        [-0.3, 1.5, 0.5],
        [3, -0.8, -1],
        [-2, 1.8, -0.8],
        [0.8, -1.8, 0.2],
      ].map((pos, i) => ({
        pos,
        scale: (0.35 + (i % 3) * 0.2) * SCALE,
        color: COLORS[i % COLORS.length],
        speed: 0.8 + (i % 4) * 0.2,
      })),
    [],
  )

  useFrame(() => {
    if (!group.current || !mouse?.normalized) return
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.normalized.x * 0.2,
      0.05,
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      mouse.normalized.y * 0.1,
      0.05,
    )
  })

  return (
    <group ref={group}>
      <CoreOrb />
      {bubblePositions.map((b, i) => (
        <Bubble key={i} position={b.pos} scale={b.scale} color={b.color} speed={b.speed} />
      ))}
      <WireRing position={[0, 0, 0]} color="#22d3ee" />
      <WireRing position={[0, 0, 0.1]} color="#f472b6" />
      <Sparkles count={250} scale={16} size={3} speed={0.6} opacity={0.7} color="#c4b5fd" />
      <Stars radius={80} depth={40} count={3000} factor={3} saturation={0} fade speed={0.8} />
      <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={14} blur={3} far={5} />
    </group>
  )
}

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1} color="#e0e7ff" />
      <pointLight position={[-3, 2, 2]} intensity={0.8} color="#7c5cff" />
      <pointLight position={[3, -1, 2]} intensity={0.6} color="#22d3ee" />
      <pointLight position={[0, 3, -2]} intensity={0.5} color="#f472b6" />
      <SceneContent mouse={mouse} />
      <Environment preset="night" environmentIntensity={0.5} />
    </>
  )
}

export default function HeroScene({ mouse }) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return <div className="absolute inset-0 mesh-bg pointer-events-none opacity-80" />
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  )
}
