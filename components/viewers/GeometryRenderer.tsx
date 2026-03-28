/**
 * GeometryRenderer — scaffold for parametric / open-geometry viewing using R3F.
 *
 * The renderer accepts a `GeometrySpec` that describes how to construct a
 * THREE.BufferGeometry procedurally.  Extend the `buildGeometry` function and
 * the `GeometrySpec` union type to add new shape families.
 *
 * Out-of-the-box shapes:
 *   - box        { w, h, d }
 *   - sphere     { radius, widthSegs, heightSegs }
 *   - cylinder   { radiusTop, radiusBottom, height, radialSegs }
 *   - torus      { radius, tube, radialSegs, tubularSegs }
 *   - plane      { w, h }
 *   - custom     { geometry: THREE.BufferGeometry }  — bring-your-own geometry
 */

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport, Stats, Environment, Edges } from '@react-three/drei';
import * as THREE from 'three';

// ── Spec types ────────────────────────────────────────────────────────────────

export type BoxSpec = { kind: 'box'; w: number; h: number; d: number };
export type SphereSpec = { kind: 'sphere'; radius: number; widthSegs?: number; heightSegs?: number };
export type CylinderSpec = {
  kind: 'cylinder';
  radiusTop: number;
  radiusBottom: number;
  height: number;
  radialSegs?: number;
};
export type TorusSpec = { kind: 'torus'; radius: number; tube: number; radialSegs?: number; tubularSegs?: number };
export type PlaneSpec = { kind: 'plane'; w: number; h: number };
export type CustomSpec = { kind: 'custom'; geometry: THREE.BufferGeometry };

export type GeometrySpec = BoxSpec | SphereSpec | CylinderSpec | TorusSpec | PlaneSpec | CustomSpec;

// ── Build geometry from spec ──────────────────────────────────────────────────

function buildGeometry(spec: GeometrySpec): THREE.BufferGeometry {
  switch (spec.kind) {
    case 'box':
      return new THREE.BoxGeometry(spec.w, spec.h, spec.d);
    case 'sphere':
      return new THREE.SphereGeometry(spec.radius, spec.widthSegs ?? 32, spec.heightSegs ?? 32);
    case 'cylinder':
      return new THREE.CylinderGeometry(spec.radiusTop, spec.radiusBottom, spec.height, spec.radialSegs ?? 32);
    case 'torus':
      return new THREE.TorusGeometry(spec.radius, spec.tube, spec.radialSegs ?? 16, spec.tubularSegs ?? 64);
    case 'plane':
      return new THREE.PlaneGeometry(spec.w, spec.h);
    case 'custom':
      return spec.geometry;
  }
}

// ── Display options ───────────────────────────────────────────────────────────

export interface GeometryDisplayOptions {
  color?: string;
  wireframe?: boolean;
  showEdges?: boolean;
  metalness?: number;
  roughness?: number;
  autoRotate?: boolean;
  envPreset?: 'studio' | 'sunset' | 'warehouse' | 'forest';
}

// ── Scene mesh ────────────────────────────────────────────────────────────────

const SceneMesh: React.FC<{
  geometry: THREE.BufferGeometry;
  opts: GeometryDisplayOptions;
}> = ({ geometry, opts }) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (opts.autoRotate && ref.current) {
      ref.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <mesh ref={ref} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color={opts.color ?? '#8ecae6'}
        wireframe={opts.wireframe ?? false}
        metalness={opts.metalness ?? 0.2}
        roughness={opts.roughness ?? 0.5}
      />
      {opts.showEdges && <Edges color="#1e3a4c" />}
    </mesh>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────

const DEFAULT_SPEC: GeometrySpec = { kind: 'box', w: 1, h: 1, d: 1 };

export interface GeometryRendererProps {
  /** Geometry to render.  Defaults to a unit box when not provided. */
  spec?: GeometrySpec;
  display?: GeometryDisplayOptions;
  /** Show the Stats overlay (fps, draw-calls, memory). */
  showStats?: boolean;
  className?: string;
}

export const GeometryRenderer: React.FC<GeometryRendererProps> = ({
  spec = DEFAULT_SPEC,
  display = {},
  showStats = false,
  className = ''
}) => {
  const geometry = useMemo(() => buildGeometry(spec), [spec]);

  return (
    <div className={`relative flex flex-col h-full overflow-hidden bg-gray-900 ${className}`}>
      {/* Controls overlay */}
      <ControlsOverlay display={display} />

      <Canvas shadows camera={{ position: [2, 2, 3], fov: 45 }} gl={{ antialias: true }} className="flex-1">
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />

        <Environment preset={display.envPreset ?? 'studio'} />

        <SceneMesh geometry={geometry} opts={display} />

        <gridHelper args={[10, 10, '#555', '#333']} position={[0, -0.5, 0]} />
        <mesh position={[0, -0.499, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.2} />
        </mesh>

        <OrbitControls makeDefault />
        <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
          <GizmoViewport />
        </GizmoHelper>

        {showStats && <Stats />}
      </Canvas>
    </div>
  );
};

// ── Overlay with display toggles ──────────────────────────────────────────────

const ControlsOverlay: React.FC<{ display: GeometryDisplayOptions }> = ({ display }) => {
  // Read-only display of active flags — wire up setState here to make them interactive.
  const flags = [
    display.wireframe && 'Wireframe',
    display.showEdges && 'Edges',
    display.autoRotate && 'Rotating',
  ].filter(Boolean);

  if (flags.length === 0) return null;

  return (
    <div className="absolute top-3 left-3 z-10 flex gap-1.5">
      {flags.map((f) => (
        <span
          key={f as string}
          className="px-2 py-0.5 text-[10px] font-medium bg-white/10 text-white/70 rounded"
        >
          {f}
        </span>
      ))}
    </div>
  );
};

// ── Convenience presets ───────────────────────────────────────────────────────

export const GEOMETRY_PRESETS: Record<string, GeometrySpec> = {
  'Unit Box':    { kind: 'box',      w: 1, h: 1, d: 1 },
  'Sphere':      { kind: 'sphere',   radius: 0.8 },
  'Cylinder':    { kind: 'cylinder', radiusTop: 0.5, radiusBottom: 0.5, height: 1.5 },
  'Cone':        { kind: 'cylinder', radiusTop: 0,   radiusBottom: 0.6, height: 1.5 },
  'Torus':       { kind: 'torus',    radius: 0.6, tube: 0.2 },
  'Flat Plane':  { kind: 'plane',    w: 2, h: 2 },
};
