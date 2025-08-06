// parse svg using `svg-parser`

import { parse } from 'svg-parser';
import { Coordinate, SVGGeometryType, SVGPolygonType, SVGCircleType, SVGPolylineType } from './SVGTypes';
import { Command, LineToCommand, MoveToCommand, parseSVG } from 'svg-path-parser';

type svgPropType = string | number | undefined;

// Transform matrix type for point transformations
type TransformMatrix = {
  a: number; // scale x
  b: number; // skew y
  c: number; // skew x
  d: number; // scale y
  e: number; // translate x
  f: number; // translate y
};

// Parse transform attribute and return transformation matrix
const parseTransform = (transform?: string): TransformMatrix => {
  const identity: TransformMatrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

  if (!transform) return identity;

  // Simple transform parsing - handles translate, scale, rotate
  const translateMatch = transform.match(/translate\(([^)]+)\)/);
  const scaleMatch = transform.match(/scale\(([^)]+)\)/);
  const rotateMatch = transform.match(/rotate\(([^)]+)\)/);

  let matrix = { ...identity };

  if (translateMatch) {
    const values = translateMatch[1].split(/[,\s]+/).map(Number);
    matrix.e = values[0] || 0;
    matrix.f = values[1] || 0;
  }

  if (scaleMatch) {
    const values = scaleMatch[1].split(/[,\s]+/).map(Number);
    matrix.a = values[0] || 1;
    matrix.d = values[1] || values[0] || 1;
  }

  if (rotateMatch) {
    const angle = ((Number(rotateMatch[1]) || 0) * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    // Apply rotation to existing matrix
    const newA = matrix.a * cos - matrix.b * sin;
    const newB = matrix.a * sin + matrix.b * cos;
    const newC = matrix.c * cos - matrix.d * sin;
    const newD = matrix.c * sin + matrix.d * cos;
    matrix.a = newA;
    matrix.b = newB;
    matrix.c = newC;
    matrix.d = newD;
  }

  return matrix;
};

// Apply transformation matrix to a coordinate
const transformPoint = (point: Coordinate, matrix: TransformMatrix): Coordinate => ({
  x: matrix.a * point.x + matrix.c * point.y + matrix.e,
  y: matrix.b * point.x + matrix.d * point.y + matrix.f
});

// Transform an array of coordinates
const transformPoints = (points: Coordinate[], props: Record<string, string | number>): Coordinate[] => {
  const transform = parseTransform(props.transform as string);
  return points.map((point) => transformPoint(point, transform));
};

const getNumberForValue = (value: svgPropType): number | null => {
  let v: number | null = null;
  if (typeof value === 'number') v = value;
  else if (typeof value === 'string') v = Number(value);

  return typeof v === 'number' && !Number.isNaN(v) ? v : null;
};

const getNumberForValues = (...vs: svgPropType[]) => vs.map(getNumberForValue);

const coordinateBuilder = (commands: (MoveToCommand | LineToCommand)[]) => {
  const coordinates: Coordinate[] = [];
  for (const c of commands) {
    if (c.command === 'moveto' || c.command === 'lineto') {
      if (c.relative)
        coordinates.push({
          x: c.x + (coordinates[coordinates.length - 1]?.x ?? 0.0),
          y: c.y + (coordinates[coordinates.length - 1]?.y ?? 0.0)
        });
      else coordinates.push({ x: c.x, y: c.y });
    }
  }

  return coordinates;
};

const handleClosedPath = (commands: Command[], props: Record<string, string | number>): SVGPolygonType => {
  const points = coordinateBuilder(
    commands.filter((c) => ['moveto', 'lineto'].includes(c.command)) as (MoveToCommand | LineToCommand)[]
  );
  return {
    type: 'polygon',
    points: transformPoints(points, props)
  };
};

const handleOpenPath = (commands: Command[], props: Record<string, string | number>): SVGPolylineType => {
  const points = coordinateBuilder(
    commands.filter((c) => ['moveto', 'lineto'].includes(c.command)) as (MoveToCommand | LineToCommand)[]
  );
  return {
    type: 'polyline',
    points: transformPoints(points, props),
    thickness: 0
  };
};

const commandArrayParser = (commands: Command[], props: Record<string, string | number>): SVGGeometryType[] => {
  let leftoverCommands = [...commands];

  let end = false;

  const svggeos: SVGGeometryType[] = [];

  // split in subpaths
  for (let i = leftoverCommands.length - 1; i >= 0; i -= 1) {
    if (leftoverCommands[i].command === 'closepath') {
      const currenCommands = leftoverCommands.slice(i + 1);
      if (currenCommands.length > 1) svggeos.push((end ? handleClosedPath : handleOpenPath)(currenCommands, props));
      leftoverCommands = leftoverCommands.slice(0, i);
      end = true;
    }
  }

  if (leftoverCommands.length > 1) svggeos.push((end ? handleClosedPath : handleOpenPath)(leftoverCommands, props));

  return svggeos;
};

const parsePath = (props: Record<string, string | number>): SVGGeometryType[] =>
  commandArrayParser(parseSVG(props.d as string), props);

const rectToPolygonType = (w: number, h: number): SVGPolygonType => ({
  type: 'polygon',
  points: [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w, y: h },
    { x: 0, y: h }
  ]
});

const parseRect = (props: Record<string, string | number>): SVGPolygonType | null => {
  const { x, y, width, height, rx, ry } = props;

  const [castX, castY, castWidth, castHeight] = getNumberForValues(x, y, width, height);

  if (castX !== null && castY !== null && castWidth !== null && castHeight !== null) {
    const rect = rectToPolygonType(castWidth, castHeight);
    return {
      ...rect,
      points: transformPoints(rect.points, props).map((c) => ({ x: c.x + castX, y: c.y + castY }))
    };
  }
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

  if (castX !== null && castY !== null && castR !== null) {
    const circle = circleToCircleType(castX, castY, castR);
    const transform = parseTransform(props.transform as string);
    return {
      ...circle,
      center: transformPoint(circle.center, transform)
    };
  }
  return null;
};

const parsePoints = (points: string): Coordinate[] => {
  const pointsArray = points.split(' ');
  const coordinates: Coordinate[] = [];

  for (let i = 0; i < pointsArray.length; i += 1) {
    const [rawX, rawY] = pointsArray[i].split(',');
    const x = getNumberForValue(rawX);
    const y = getNumberForValue(rawY);
    if (x !== null && y !== null) coordinates.push({ x, y });
  }

  return coordinates;
};

const parsePolygon = (props: Record<string, string | number>): SVGPolygonType | null => {
  const { points } = props;

  const parsedPoints = points ? parsePoints(points as string) : [];
  if (parsedPoints.length > 0) {
    return {
      type: 'polygon',
      points: transformPoints(parsedPoints, props)
    };
  }
  return null;
};

const parsePolyline = (props: Record<string, string | number>): SVGPolylineType | null => {
  const { points } = props;

  const parsedPoints = points ? parsePoints(points as string) : [];
  const thickness = getNumberForValue(props['stroke-width']) ?? 0.0;

  if (parsedPoints.length > 0) {
    return {
      type: 'polyline',
      thickness,
      points: transformPoints(parsedPoints, props)
    };
  }
  return null;
};

const parseLine = (props: Record<string, string | number>): SVGPolylineType | null => {
  const { x1, y1, x2, y2 } = props;

  const [castX1, castY1, castX2, castY2] = getNumberForValues(x1, y1, x2, y2);
  const thickness = getNumberForValue(props['stroke-width']) ?? 0.0;

  if (castX1 !== null && castY1 !== null && castX2 !== null && castY2 !== null) {
    const points = [
      { x: castX1, y: castY1 },
      { x: castX2, y: castY2 }
    ];
    return {
      type: 'polyline',
      thickness,
      points: transformPoints(points, props)
    };
  }
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
        svgGeometryTypes.push(...parsePath(svgChild.properties));
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
