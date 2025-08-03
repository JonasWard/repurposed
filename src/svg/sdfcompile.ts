// methods that translate SVGTypes into an sdf method to be used in a fragment shader

import { sdfLibrary } from '../webgl/shaders/sdfLibrary';
import { Coordinate, SVGCircleType, SVGGeometryType, SVGPolygonType, SVGPolylineType } from './SVGTypes';

const getFormattedNumber = (n: number) => n.toFixed(6);
const getVec2 = (c: Coordinate) => `vec2(${getFormattedNumber(c.x)}, ${getFormattedNumber(c.y)})`;
const getVec2s = (cs: Coordinate[]) => cs.map((c) => getVec2(c)).join(',\n');

/**
 * @param sdfMethod - base string sdf fragment shader method for a given geometry type
 * @param index - the method of this index
 * @returns [name of method, updated base method string with new name embedded]
 */
const parseSdfMethodName = (sdfMethod: string, index: number): [string, string] => {
  const [partA, partB] = sdfMethod.split('(');
  const name = `${partA.replace('float ', '')}${index}`;
  return [name, `float ${name}(${partB}`];
};

const sdfMethodsMap: Record<SVGGeometryType['type'], string> = {
  circle: sdfLibrary.circleSdf,
  polygon: sdfLibrary.polygonSdf,
  polyline: sdfLibrary.polylineSdf
};

const parseCircle = (c: SVGCircleType, index: number): [string, string] =>
  parseSdfMethodName(
    sdfMethodsMap.circle.replace('${vec2Center}', getVec2(c.center)).replace('${radius}', getFormattedNumber(c.radius)),
    index
  );

const parsePolygon = (p: SVGPolygonType, index: number): [string, string] =>
  parseSdfMethodName(
    sdfMethodsMap.polygon
      .replaceAll('${pointCount}', p.points.length.toString())
      .replace('${pointsAsVec2}', getVec2s(p.points)),
    index
  );

const parsePolyline = (p: SVGPolylineType, index: number): [string, string] =>
  parseSdfMethodName(
    sdfMethodsMap.polyline
      .replaceAll('${pointCount}', p.points.length.toString())
      .replace('${pointsAsVec2}', getVec2s(p.points))
      .replace('${thickness}', getFormattedNumber(p.thickness)),
    index
  );

export const getDistanceMethod = (...geometries: SVGGeometryType[]) => {
  const mNDef: [string, string][] = [];
  let i = 0;

  // parse in each of the SVGGeometries
  for (const svgGeo of geometries) {
    switch (svgGeo.type) {
      case 'circle':
        mNDef.push(parseCircle(svgGeo, i));
        break;
      case 'polygon':
        mNDef.push(parsePolygon(svgGeo, i));
        break;
      case 'polyline':
        mNDef.push(parsePolyline(svgGeo, i));
        break;
    }

    i++;
  }

  return `
  ${mNDef.map(([, method]) => method).join('\n\n')}
  
float sdf(vec2 p) {
  float d = ${mNDef[0][0]}(p);
${mNDef
  .slice(1)
  .map(([name]) => `  d = min(d, ${name}(p));`)
  .join('\n')}  
  return d;
}`;
};
