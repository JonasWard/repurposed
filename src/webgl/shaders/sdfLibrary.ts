import circleSdf from './sdf/circleSdf.glsl' with {type: "text"};
import squareSdf from './sdf/squareSdf.glsl' with {type: "text"};
import roundedBoxSdf from './sdf/roundedBoxSdf.glsl' with {type: "text"};
import crossSdf from './sdf/crossSdf.glsl' with {type: "text"};
import ringsSdf from './sdf/ringsSdf.glsl' with {type: "text"};
import vesicaSdf from './sdf/vesicaSdf.glsl' with {type: "text"};
import starSdf  from './sdf/starSdf.glsl' with {type: "text"};
import morphingSdf  from './sdf/morphingSdf.glsl' with {type: "text"};
import noiseSimplex  from './sdf/noiseSimplex.glsl' with {type: "text"};
import defaultSdf from './sdf/defaultSdf.glsl' with {type: "text"};
import polygonSdf from './sdf/polygonSdf.glsl' with {type: "text"};
import polylineSdf from './sdf/polylineSdf.glsl' with {type: "text"};
import gridDistanceSdf from './sdf/gridDistanceSdf.glsl' with {type: "text"};
import hexGridSdf from './sdf/hexGridSdf.glsl' with {type: "text"};
import triangleGridSdf from './sdf/triangleGridSdf.glsl' with {type: "text"};

export const sdfLibrary = {
  defaultSdf,
  circleSdf,
  squareSdf,
  roundedBoxSdf,
  crossSdf,
  ringsSdf,
  vesicaSdf,
  starSdf,
  morphingSdf,
  noiseSimplex,
  polygonSdf,
  polylineSdf,
  gridDistanceSdf,
  hexGridSdf,
  triangleGridSdf
};
