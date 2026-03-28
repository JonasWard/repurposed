/**
 * IFCRenderer — placeholder.
 * Wire up an IFC parsing library (e.g. web-ifc, @thatopen/components) here.
 */

export interface IFCRendererProps {
  url?: string | null;
  className?: string;
}

export const IFCRenderer: React.FC<IFCRendererProps> = ({ className = '' }) => (
  <div className={`flex flex-col items-center justify-center h-full gap-3 text-gray-400 bg-gray-950 ${className}`}>
    <div className="text-5xl opacity-30">🏗</div>
    <p className="text-sm">IFC renderer — not yet implemented.</p>
  </div>
);
