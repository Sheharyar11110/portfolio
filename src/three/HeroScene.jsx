import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  Sparkles,
  ContactShadows,
} from '@react-three/drei'
import * as THREE from 'three'
import { useMediaQuery } from '../hooks/useMediaQuery'

function GlassOrb({ position, scale = 1, color = '#e8e6e3' }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.08
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.1
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          resolution={256}
          transmission={0.98}
          thickness={0.4}
          roughness={0.05}
          chromaticAberration={0.04}
          anisotropy={0.15}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.08}
          color={color}
          attenuationDistance={0.8}
          attenuationColor="#ffffff"
        />
      </mesh>
    </Float>
  )
}

function MetallicTorus({ position }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.15
    ref.current.rotation.z = state.clock.elapsedTime * 0.1
  })

  return (
    <Float speed={0.8} floatIntensity={0.3}>
      <mesh ref={ref} position={position}>
        <torusKnotGeometry args={[0.55, 0.14, 128, 32]} />
        <meshStandardMaterial
          color="#c8c8cc"
          metalness={0.95}
          roughness={0.12}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  )
}

function SoftBlob({ position }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.15
    ref.current.rotation.y = t * 0.06
  })

  return (
    <mesh ref={ref} position={position} scale={0.7}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        color="#6b7c8f"
        transparent
        opacity={0.35}
        roughness={0.2}
        metalness={0.1}
        transmission={0.6}
        thickness={0.5}
      />
    </mesh>
  )
}

function Ribbon() {
  const ref = useRef()
  const curve = useMemo(() => {
    const points = []
    for (let i = 0; i <= 40; i++) {
      const t = (i / 40) * Math.PI * 2
      points.push(
        new THREE.Vector3(
          Math.cos(t) * 2.2,
          Math.sin(t * 2) * 0.4,
          Math.sin(t) * 1.8,
        ),
      )
    }
    return new THREE.CatmullRomCurve3(points)
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <mesh ref={ref}>
      <tubeGeometry args={[curve, 80, 0.02, 8, false]} />
      <meshStandardMaterial
        color="#9a9a9e"
        metalness={0.8}
        roughness={0.3}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

function SceneContent({ mouse }) {
  const group = useRef()

  useFrame(() => {
    if (!group.current || !mouse?.normalized) return
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.normalized.x * 0.12,
      0.04,
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      mouse.normalized.y * 0.06,
      0.04,
    )
  })

  return (
    <group ref={group}>
      <GlassOrb position={[-1.8, 0.3, 0]} scale={0.85} />
      <GlassOrb position={[2, -0.2, -0.5]} scale={0.55} color="#d4d2cf" />
      <MetallicTorus position={[0.5, 0.8, -1]} />
      <SoftBlob position={[-0.5, -1, -1.5]} />
      <Ribbon />
      <Sparkles
        count={80}
        scale={8}
        size={1.2}
        speed={0.2}
        opacity={0.35}
        color="#c8c8cc"
      />
      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.35}
        scale={12}
        blur={2.5}
        far={4}
      />
    </group>
  )
}

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#fff8f0" />
      <directionalLight position={[-4, 2, -3]} intensity={0.3} color="#8a9bab" />
      <pointLight position={[0, 2, 2]} intensity={0.5} color="#ffffff" />
      <SceneContent mouse={mouse} />
      <Environment preset="city" environmentIntensity={0.35} />
    </>
  )
}

export default function HeroScene({ mouse }) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return (
      <div className="absolute inset-0 gradient-ambient pointer-events-none" />
    )
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  )
}
