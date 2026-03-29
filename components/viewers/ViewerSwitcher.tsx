/**
 * ViewerSwitcher — tab bar + dynamic renderer host.
 *
 * The active tab is stored in the global Zustand store (`viewerMode`) so any
 * other component can read or set it:
 *
 *   const { viewerMode, setViewerMode } = useRepurposedStore();
 *
 * Usage:
 *   <ViewerSwitcher
 *     pdfSource="/sample.pdf"
 *     ifcUrl="/model.ifc"
 *     geometrySpec={{ kind: 'sphere', radius: 1 }}
 *     geometryDisplay={{ autoRotate: true, showEdges: true }}
 *   />
 */

import dynamic from 'next/dynamic';
import { useRepurposedStore, type ViewerMode } from '@/lib/store';
import type { PDFRendererProps } from './PDFRenderer';
import type { IFCRendererProps } from './IFCRenderer';
import type { GeometryRendererProps } from './GeometryRenderer';

// ── Lazy-load heavy renderers (avoids SSR issues with WASM / WebGL) ────────────

const PDFRenderer = dynamic(
  () => import('./PDFRenderer').then((m) => m.PDFRenderer),
  { ssr: false, loading: () => <RendererLoader label="PDF renderer" /> },
);

const IFCRenderer = dynamic(
  () => import('./IFCRenderer').then((m) => m.IFCRenderer),
  { ssr: false, loading: () => <RendererLoader label="IFC renderer" /> },
);

const GeometryRenderer = dynamic(
  () => import('./GeometryRenderer').then((m) => m.GeometryRenderer),
  { ssr: false, loading: () => <RendererLoader label="Geometry renderer" /> },
);

// ── Tab config ────────────────────────────────────────────────────────────────

const TABS: { mode: ViewerMode; label: string; icon: string; description: string }[] = [
  {
    mode: 'geometry',
    label: 'Geometry',
    icon: '⬡',
    description: 'Parametric 3D geometry viewer (Three.js / R3F)',
  },
  {
    mode: 'ifc',
    label: 'IFC',
    icon: '🏗',
    description: 'IFC building-model viewer (web-ifc + Three.js)',
  },
  {
    mode: 'pdf',
    label: 'PDF',
    icon: '📄',
    description: 'PDF document viewer (react-pdf / PDF.js)',
  },
];

// ── Props ─────────────────────────────────────────────────────────────────────

export interface ViewerSwitcherProps {
  /** Props forwarded to PDFRenderer */
  pdf?: Omit<PDFRendererProps, 'className'>;
  /** Props forwarded to IFCRenderer */
  ifc?: Omit<IFCRendererProps, 'className'>;
  /** Props forwarded to GeometryRenderer */
  geometry?: Omit<GeometryRendererProps, 'className'>;
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const ViewerSwitcher: React.FC<ViewerSwitcherProps> = ({
  pdf = {},
  ifc = {},
  geometry = {},
  className = '',
}) => {
  const viewerMode   = useRepurposedStore((s) => s.viewerMode);
  const setViewerMode = useRepurposedStore((s) => s.setViewerMode);

  return (
    <div className={`flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {/* Tab bar */}
      <div className="flex shrink-0 bg-white border-b border-gray-200">
        {TABS.map(({ mode, label, icon, description }) => {
          const active = viewerMode === mode;
          return (
            <button
              key={mode}
              title={description}
              onClick={() => setViewerMode(mode)}
              className={`
                flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors
                ${active
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <span className="text-base leading-none">{icon}</span>
              {label}
            </button>
          );
        })}

        {/* Mode badge */}
        <div className="ml-auto flex items-center pr-4">
          <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
            {viewerMode}
          </span>
        </div>
      </div>

      {/* Renderer panel */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        {viewerMode === 'pdf'      && <PDFRenderer      {...pdf}      className="h-full" />}
        {viewerMode === 'ifc'      && <IFCRenderer      {...ifc}      className="h-full" />}
        {viewerMode === 'geometry' && <GeometryRenderer {...geometry} className="h-full" />}
      </div>
    </div>
  );
};

// ── Loading placeholder ───────────────────────────────────────────────────────

const RendererLoader: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400 text-sm bg-gray-950">
    <div className="w-6 h-6 border-2 border-gray-600 border-t-blue-400 rounded-full animate-spin" />
    <span>Loading {label}…</span>
  </div>
);
