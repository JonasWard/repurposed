/**
 * PDFRenderer — scaffold using react-pdf (pdfjs-dist under the hood).
 *
 * Drop a PDF URL or File into the `source` prop and it will render page by
 * page with navigation controls.  The worker URL points to the pdfjs WASM
 * bundled alongside react-pdf; for Next.js you can also copy the worker to
 * /public and set pdfjs.GlobalWorkerOptions.workerSrc there.
 */

import { useCallback, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Use the unpkg CDN for the PDF.js worker — avoids Next.js/webpack ESM issues
// with new URL('esm-package', import.meta.url).
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PDFRendererProps {
  /** URL string, File, or Blob of the PDF to display. */
  source?: string | File | null;
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const PDFRenderer: React.FC<PDFRendererProps> = ({ source, className = '' }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPage(1);
    setError(null);
  }, []);

  const onLoadError = useCallback((err: Error) => {
    setError(err.message);
  }, []);

  // ── Empty state ────────────────────────────────────────────────────────────

  if (!source) {
    return (
      <div className={`flex flex-col items-center justify-center h-full gap-3 text-gray-400 ${className}`}>
        <div className="text-5xl opacity-30">📄</div>
        <p className="text-sm">No PDF loaded. Provide a URL or drop a file.</p>
        <DropZone onFile={(f) => void f} />
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────

  if (error) {
    return (
      <div className={`flex items-center justify-center h-full text-red-500 text-sm ${className}`}>
        Failed to load PDF: {error}
      </div>
    );
  }

  // ── Document ───────────────────────────────────────────────────────────────

  const file = source instanceof File ? source : { url: source };

  return (
    <div className={`flex flex-col h-full overflow-hidden bg-gray-100 ${className}`}>
      {/* Page navigation */}
      {numPages > 0 && (
        <div className="flex items-center justify-center gap-4 py-2 bg-white border-b border-gray-200 shrink-0">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            ‹ Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {page} / {numPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(numPages, p + 1))}
            disabled={page >= numPages}
            className="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            Next ›
          </button>
        </div>
      )}

      {/* PDF canvas */}
      <div className="flex-1 overflow-auto flex justify-center py-4">
        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          onLoadError={onLoadError}
          loading={<Spinner label="Loading PDF…" />}
        >
          <Page
            pageNumber={page}
            renderTextLayer
            renderAnnotationLayer
          />
        </Document>
      </div>
    </div>
  );
};

// ── Sub-components ─────────────────────────────────────────────────────────────

const Spinner: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex flex-col items-center gap-2 pt-20 text-gray-400 text-sm">
    <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
    {label}
  </div>
);

/** Minimal drop zone so users can load a local PDF without a full upload flow. */
const DropZone: React.FC<{ onFile: (f: File) => void }> = ({ onFile }) => {
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/pdf') onFile(file);
  };

  return (
    <label
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="mt-2 flex flex-col items-center gap-1 px-8 py-5 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors text-xs text-gray-400"
    >
      Drop a PDF here or{' '}
      <span className="text-gray-600 underline">browse</span>
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </label>
  );
};
