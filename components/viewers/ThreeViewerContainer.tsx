import React, { useEffect, useRef, useState } from 'react';
import type { Door, OpenPlans as OpenPlansInstance, Wall, Window } from '@opengeometry/openplans';
import {
  applyViewerMode,
  fitPreviewElement,
  loadOpenPlansModule,
  removePreviewElement,
  syncPreviewElement,
  togglePreviewGrid,
  type PreviewViewerMode,
} from '@/lib/openplans/client';
import type { ListingPreviewSpec } from '@/lib/openplans/listingPreview';

type PreviewElement = Wall | Window | Door;
type OpenPlansModule = typeof import('@opengeometry/openplans');
type ViewerSurfaceMode = PreviewViewerMode | 'pdf';

interface ThreeViewerContainerProps {
  className?: string;
  preview?: ListingPreviewSpec | null;
  minHeight?: number | string;
  pdfPreview?: {
    source?: string | null;
    status: 'idle' | 'generating' | 'ready';
    ensureSource: () => Promise<string | null>;
  };
}

const toolbarButtonStyle = (active: boolean): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.45rem',
  padding: '0.72rem 1rem',
  borderRadius: '999px',
  border: active ? '1px solid #f0c542' : '1px solid rgba(17, 17, 17, 0.18)',
  background: active ? '#f0c542' : 'rgba(255,255,255,0.92)',
  color: active ? '#111111' : '#1f2937',
  fontSize: '0.78rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  boxShadow: active ? '0 10px 24px rgba(240, 197, 66, 0.28)' : '0 8px 20px rgba(15, 23, 42, 0.10)',
  backdropFilter: 'blur(14px)',
});

const IconPlan = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
    <rect x="2.5" y="3.5" width="11" height="9" rx="1.5" />
    <path d="M5 6.5H11" />
    <path d="M5 9.5H9.5" />
  </svg>
);

const IconModel = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M8 2.5L2.5 5.5V10.5L8 13.5L13.5 10.5V5.5L8 2.5Z" />
    <path d="M8 13.5V8" />
    <path d="M13.5 5.5L8 8L2.5 5.5" />
  </svg>
);

const IconPdf = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M4 2.5h5l3 3v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z" />
    <path d="M9 2.5v3h3" />
    <path d="M5 10h1.2a1 1 0 0 0 0-2H5v4" />
    <path d="M8 12h1a1 1 0 1 0 0-2H8v2Zm0 0V8" />
  </svg>
);

export const ThreeViewerContainer: React.FC<ThreeViewerContainerProps> = ({
  className = '',
  preview = null,
  minHeight = '500px',
  pdfPreview,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const moduleRef = useRef<OpenPlansModule | null>(null);
  const openPlansRef = useRef<OpenPlansInstance | null>(null);
  const elementRef = useRef<PreviewElement | null>(null);

  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [viewerMode, setViewerMode] = useState<ViewerSurfaceMode>('model');

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (!containerRef.current) return;

      try {
        setStatus('loading');
        const openPlansModule = await loadOpenPlansModule();
        if (cancelled || !containerRef.current) return;

        moduleRef.current = openPlansModule;
        const openPlans = new openPlansModule.OpenPlans(containerRef.current);
        openPlansRef.current = openPlans;

        await openPlans.setupOpenGeometry();
        togglePreviewGrid(openPlans, false);
        if (cancelled) return;

        setStatus('ready');
      } catch (error) {
        console.error('Failed to initialise OpenPlans viewer:', error);
        if (!cancelled) setStatus('error');
      }
    };

    init();

    return () => {
      cancelled = true;
      removePreviewElement(elementRef.current);
      elementRef.current = null;
      openPlansRef.current = null;
      moduleRef.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    if (viewerMode === 'pdf') return;
    if (status !== 'ready' || !moduleRef.current || !openPlansRef.current) return;

    elementRef.current = syncPreviewElement(
      moduleRef.current,
      openPlansRef.current,
      elementRef.current,
      preview ?? null,
    );
    applyViewerMode(moduleRef.current, openPlansRef.current, elementRef.current, viewerMode);

    if (elementRef.current) {
      requestAnimationFrame(() => {
        if (openPlansRef.current) {
          fitPreviewElement(openPlansRef.current, elementRef.current);
        }
      });
    }
  }, [preview, status, viewerMode]);

  useEffect(() => {
    if (viewerMode !== 'pdf' || !pdfPreview || pdfPreview.status !== 'idle') return;
    void pdfPreview.ensureSource();
  }, [pdfPreview, viewerMode]);

  const showPlaceholder = viewerMode !== 'pdf' && (status !== 'ready' || !preview);
  const showPdfView = Boolean(pdfPreview);
  const pdfPreviewSrc = pdfPreview?.source
    ? `${pdfPreview.source}#page=2&view=FitH&toolbar=0&navpanes=0&scrollbar=0`
    : null;

  return (
    <div
      className={`three-viewer-container ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight,
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        background:
          'radial-gradient(circle at top left, rgba(42,70,122,0.55), transparent 42%), linear-gradient(160deg, #101728 0%, #12203a 48%, #0a1425 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          zIndex: 20,
          display: 'inline-flex',
          gap: '0.5rem',
          padding: '0.35rem',
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.72)',
          boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <button
          type="button"
          style={toolbarButtonStyle(viewerMode === 'plan')}
          onClick={() => setViewerMode('plan')}
        >
          <IconPlan />
          <span>Plan View</span>
        </button>
        <button
          type="button"
          style={toolbarButtonStyle(viewerMode === 'model')}
          onClick={() => setViewerMode('model')}
        >
          <IconModel />
          <span>Model View</span>
        </button>
        {showPdfView && (
          <button
            type="button"
            style={toolbarButtonStyle(viewerMode === 'pdf')}
            onClick={() => {
              setViewerMode('pdf');
              if (pdfPreview?.status === 'idle') {
                void pdfPreview.ensureSource();
              }
            }}
          >
            <IconPdf />
            <span>PDF View</span>
          </button>
        )}
      </div>

      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          visibility: viewerMode === 'pdf' ? 'hidden' : 'visible',
        }}
      />

      {viewerMode === 'pdf' && showPdfView && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#ffffff',
            zIndex: 10,
          }}
        >
          {pdfPreview?.status === 'ready' && pdfPreviewSrc ? (
            <iframe
              title="Technical PDF preview"
              src={pdfPreviewSrc}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: '#ffffff',
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                fontSize: '0.9rem',
                fontWeight: 600,
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(245,245,245,0.96))',
              }}
            >
              {pdfPreview?.status === 'generating' ? 'Generating PDF preview…' : 'Preparing PDF preview…'}
            </div>
          )}
        </div>
      )}

      {showPlaceholder && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.9rem',
            color: 'rgba(255, 255, 255, 0.72)',
            background:
              status === 'error'
                ? 'linear-gradient(180deg, rgba(84,20,20,0.35), rgba(10,20,37,0.92))'
                : 'linear-gradient(180deg, rgba(10,20,37,0.42), rgba(10,20,37,0.82))',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.18)',
              display: 'grid',
              placeItems: 'center',
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(18px)',
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.9 }}
            >
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
              <path d="M12 22V12" />
              <path d="M22 7l-10 5" />
              <path d="M2 7l10 5" />
            </svg>
          </div>
          <div style={{ textAlign: 'center', maxWidth: '260px', lineHeight: 1.45 }}>
            <div style={{ fontSize: '0.96rem', fontWeight: 700, letterSpacing: '0.04em' }}>
              {status === 'loading'
                ? 'Preparing OpenPlans preview'
                : status === 'error'
                  ? 'OpenPlans preview failed to load'
                  : 'Generating live element preview'}
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.78, marginTop: '0.25rem' }}>
              {status === 'error'
                ? 'The element viewer could not be initialised in this browser session.'
                : 'The 2D and 3D views will appear here once the viewer is ready.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
