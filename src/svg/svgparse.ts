// parse svg using `svg-parser`

import { parse } from 'svg-parser';
import { Coordinate, SVGGeometryType, SVGPolygonType, SVGCircleType, SVGPolylineType } from './SVGTypes';
import { Command, parseSVG } from 'svg-path-parser';

type svgPropType = string | number | undefined;

const getNumberForValue = (value: svgPropType): number | null => {
  let v: number | null = null;
  if (typeof value === 'number') v = value;
  else if (typeof value === 'string') v = Number(value);

  return typeof v === 'number' && !Number.isNaN(v) ? v : null;
};

const getNumberForValues = (...vs: svgPropType[]) => vs.map(getNumberForValue);

const commandArrayParser = (commands: Command[]): Coordinate[] => {
  return [
    {
      x: 0,
      y: 0
    },
    {
      x: 100,
      y: 0
    },
    {
      x: 100,
      y: 100
    },
    {
      x: 0,
      y: 100
    }
  ];
};

const parsePath = (props: Record<string, string | number>): SVGPolygonType => {
  const commands = parseSVG(props.d as string);

  return { type: 'polygon', points: commandArrayParser(commands) };
};

const rectToPolygonType = (w: number, h: number, x: number, y: number): SVGPolygonType => ({
  type: 'polygon',
  points: [
    { x: x, y: y },
    { x: x + w, y: y },
    { x: x + w, y: y + h },
    { x: x, y: y + h }
  ]
});

const parseRect = (props: Record<string, string | number>): SVGPolygonType | null => {
  const { x, y, width, height, rx, ry } = props;

  const [castX, castY, castWidth, castHeight] = getNumberForValues(x, y, width, height);

  if (castX !== null && castY !== null && castWidth !== null && castHeight !== null)
    return rectToPolygonType(castX, castY, castWidth, castHeight);
  return null;
};

const circleToCircleType = (x: number, y: number, radius: number): SVGCircleType => ({
  type: 'circle',
  center: { x, y },
  radius
});

const parseCircle = (props: Record<string, string | number>): SVGCircleType | null => {
  const { cx, cy, r } = props;
  const [castX, castY, castR] = getNumberForValues(cx, cy, r);

  if (castX !== null && castY !== null && castR !== null) return circleToCircleType(castX, castY, castR);
  return null;
};

const parsePoints = (points: string): Coordinate[] => {
  const pointsArray = points.split(' ');
  const coordinates: Coordinate[] = [];

  for (let i = 0; i < pointsArray.length; i += 1) {
    const [rawX, rawY] = pointsArray[i].split(',');
    const x = getNumberForValue(rawX);
    const y = getNumberForValue(rawY);
    if (x && y) coordinates.push({ x, y });
  }

  return coordinates;
};

const parsePolygon = (props: Record<string, string | number>): SVGPolygonType | null => {
  const { points } = props;

  const parsedPoints = points ? parsePoints(points as string) : [];
  if (parsedPoints.length > 0) return { type: 'polygon', points: parsedPoints };
  return null;
};

const parsePolyline = (props: Record<string, string | number>): SVGPolylineType | null => {
  const { points, strokeWidth } = props;

  const parsedPoints = points ? parsePoints(points as string) : [];
  const thickness = getNumberForValue(strokeWidth) ?? 0.0;

  if (parsedPoints.length > 0) return { type: 'polyline', thickness, points: parsedPoints };
  return null;
};

const parseLine = (props: Record<string, string | number>): SVGPolylineType | null => {
  const { x1, y1, x2, y2, strokeWidth } = props;

  const [castX1, castY1, castX2, castY2] = getNumberForValues(x1, y1, x2, y2);
  const thickness = getNumberForValue(strokeWidth) ?? 0.0;

  if (castX1 !== null && castY1 !== null && castX2 !== null && castY2 !== null)
    return {
      type: 'polyline',
      thickness,
      points: [
        { x: castX1, y: castY1 },
        { x: castX2, y: castY2 }
      ]
    };
  return null;
};

/**
 * Method that parses svg types defined in SVGTypes
 * path, rect, polygon parse to the `SVGPolygonType` type
 * circle parse to the `SVGEllipseType` type
 * line, polyline parse to the `SVGPolylineType` type
 * @param svgString svg string to parse
 * @returns `SVGGeometryType[]`
 */
export function parseSvg(svgString: string) {
  const parsedSvg = parse(svgString);
  const svg = parsedSvg.children[0];
  if (svg.type !== 'element') return [];
  const svgChildren = svg.children;
  const svgGeometryTypes: SVGGeometryType[] = [];
  // go through each child of svg
  for (const svgChild of svgChildren) {
    if (typeof svgChild === 'string') continue;
    if (svgChild.type !== 'element') continue;
    if (!svgChild.properties) continue;
    switch (svgChild.tagName) {
      case 'path':
        svgGeometryTypes.push(parsePath(svgChild.properties));
        break;
      case 'rect':
        const rectResult = parseRect(svgChild.properties);
        if (rectResult) svgGeometryTypes.push(rectResult);
        break;
      case 'polygon':
        const polygonResult = parsePolygon(svgChild.properties);
        if (polygonResult) svgGeometryTypes.push(polygonResult);
        break;
      case 'circle':
        const circleResult = parseCircle(svgChild.properties);
        if (circleResult) svgGeometryTypes.push(circleResult);
        break;
      case 'line':
        const lineResult = parseLine(svgChild.properties);
        if (lineResult) svgGeometryTypes.push(lineResult);
        break;
      case 'polyline':
        const polylineResult = parsePolyline(svgChild.properties);
        if (polylineResult) svgGeometryTypes.push(polylineResult);
        break;
      default:
        break;
    }
  }

  return svgGeometryTypes;
}
