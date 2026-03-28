/**
 * IFCRenderer — scaffold using web-ifc (WebAssembly IFC parser) + R3F.
 *
 * Loading pipeline:
 *  1. User drops / selects an .ifc file.
 *  2. The file bytes are passed to web-ifc's IfcAPI.
 *  3. All mesh geometries are extracted and converted to THREE.BufferGeometry.
 *  4. The resulting meshes are rendered in an R3F Canvas with orbit controls.
 *
 * web-ifc needs its WASM binary at runtime.  Copy
 *   node_modules/web-ifc/web-ifc.wasm  →  public/wasm/web-ifc.wasm
 * and set the wasmPath below accordingly.  The setup function call is the
 * only required change before this renderer becomes fully functional.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, GizmoHelper, GizmoViewport } from '@react-three/drei';
import * as THREE from 'three';
import * as WebIFC from 'web-ifc';

// ── Config ────────────────────────────────────────────────────────────────────

/** Path to web-ifc.wasm relative to the public root. */
const WASM_PATH = '/wasm/';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface IFCRendererProps {
  /** URL of an .ifc file to load automatically (optional). */
  url?: string | null;
  className?: string;
}

interface IFCMesh {
  id: string;
  geometry: THREE.BufferGeometry;
  color: THREE.Color;
  opacity: number;
}

// ── IFC loading logic ─────────────────────────────────────────────────────────

async function loadIFC(
  data: Uint8Array,
  onProgress?: (pct: number) => void,
): Promise<IFCMesh[]> {
  const api = new WebIFC.IfcAPI();
  await api.Init({ wasmPath: WASM_PATH });

  const modelId = api.OpenModel(data);
  const meshes: IFCMesh[] = [];
  let processed = 0;

  api.StreamAllMeshes(modelId, (ifcMesh) => {
    for (let g = 0; g < ifcMesh.geometries.size(); g++) {
      const geomData = ifcMesh.geometries.get(g);
      const geom = api.GetGeometry(modelId, geomData.geometryExpressID);
      const verts = api.GetRawFileVerts(modelId).buffer;
      const indices = api.GetIndexArray(geom);
      const vertArray = api.GetVertexArray(geom);

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(vertArray.buffer, vertArray.byteOffset, vertArray.length / 2), 3),
      );
      geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(verts, vertArray.byteOffset + vertArray.length / 2 * 4, vertArray.length / 2), 3),
      );
      geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices.buffer, indices.byteOffset, indices.length), 1));

      meshes.push({
        id: `${ifcMesh.expressID}-${g}`,
        geometry,
        color: new THREE.Color(geomData.color.x, geomData.color.y, geomData.color.z),
        opacity: geomData.color.w,
      });

      void verts;
    }
    processed++;
    onProgress?.(processed);
  });

  api.CloseModel(modelId);
  return meshes;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const IFCRenderer: React.FC<IFCRendererProps> = ({ url, className = '' }) => {
  const [meshes, setMeshes] = useState<IFCMesh[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (data: Uint8Array) => {
    setLoading(true);
    setError(null);
    setProgress(0);
    try {
      const result = await loadIFC(data, (n) => setProgress(n));
      setMeshes(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-load from URL prop
  useEffect(() => {
    if (!url) return;
    fetch(url)
      .then((r) => r.arrayBuffer())
      .then((buf) => load(new Uint8Array(buf)))
      .catch((e) => setError(e.message));
  }, [url, load]);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const buf = ev.target?.result;
        if (buf instanceof ArrayBuffer) load(new Uint8Array(buf));
      };
      reader.readAsArrayBuffer(file);
    },
    [load],
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const buf = ev.target?.result;
        if (buf instanceof ArrayBuffer) load(new Uint8Array(buf));
      };
      reader.readAsArrayBuffer(file);
    },
    [load],
  );

  // ── Empty / loading / error states ────────────────────────────────────────

  const isEmpty = !loading && meshes.length === 0 && !error;

  return (
    <div
      className={`relative flex flex-col h-full overflow-hidden bg-gray-950 ${className}`}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Overlay states */}
      {isEmpty && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-gray-400 pointer-events-none">
          <div className="text-5xl opacity-30">🏗</div>
          <p className="text-sm">No IFC model loaded. Drop a .ifc file here.</p>
          <label className="pointer-events-auto mt-2 px-4 py-2 text-xs border border-gray-600 rounded hover:border-gray-400 cursor-pointer transition-colors">
            Browse .ifc file
            <input type="file" accept=".ifc" className="hidden" onChange={onFileChange} />
          </label>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gray-950/80 text-gray-300 text-sm">
          <div className="w-6 h-6 border-2 border-gray-600 border-t-blue-400 rounded-full animate-spin" />
          <span>Parsing IFC… ({progress} meshes)</span>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center text-red-400 text-sm p-8 text-center">
          Error: {error}
        </div>
      )}

      {/* File controls when model is loaded */}
      {meshes.length > 0 && (
        <div className="absolute top-3 right-3 z-10">
          <label className="px-3 py-1.5 text-xs bg-gray-800 text-gray-300 rounded border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors">
            Load new…
            <input type="file" accept=".ifc" className="hidden" onChange={onFileChange} />
          </label>
        </div>
      )}

      {/* R3F canvas */}
      <Canvas
        camera={{ position: [50, 50, 50], fov: 45 }}
        gl={{ antialias: true }}
        className="flex-1"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[100, 100, 50]} intensity={1.2} />
        <directionalLight position={[-100, -50, -50]} intensity={0.4} />

        {meshes.length > 0 && (
          <Center>
            {meshes.map((m) => (
              <mesh key={m.id} geometry={m.geometry}>
                <meshStandardMaterial
                  color={m.color}
                  transparent={m.opacity < 1}
                  opacity={m.opacity}
                  side={THREE.DoubleSide}
                />
              </mesh>
            ))}
          </Center>
        )}

        <OrbitControls makeDefault />
        <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
          <GizmoViewport />
        </GizmoHelper>
        <gridHelper args={[200, 20, '#444', '#333']} />
      </Canvas>
    </div>
  );
};
