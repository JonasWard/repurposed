'use client';

import { ElementData } from '@/lib/elements';
import dynamic from 'next/dynamic';

const LazyMap = dynamic(() => import('@/components/leaflet/Map'), {
  ssr: false,
  loading: () => <p className="w-full h-full flex items-center justify-center">Loading...</p>
});

export const Map: React.FC<{ elements: ElementData[]; className: string }> = ({ elements, className }) => (
  <LazyMap elements={elements} className={className} />
);

export default Map;
