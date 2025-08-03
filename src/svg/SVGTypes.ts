const parsableTypes = ['circle', 'line', 'polygon', 'rect', 'path', 'viewBox'] as const;
export type ParsableType = (typeof parsableTypes)[number];

export type Coordinate = { x: number; y: number };

export type SVGCircleType = { type: 'circle'; center: Coordinate; radius: number };
export type SVGPolygonType = { type: 'polygon'; points: Coordinate[] };
export type SVGPolylineType = { type: 'polyline'; points: Coordinate[]; thickness: number };
export type SVGViewBoxType = { type: 'viewBox'; viewBox: string };

export type SVGGeometryType = SVGCircleType | SVGPolygonType | SVGPolylineType;
