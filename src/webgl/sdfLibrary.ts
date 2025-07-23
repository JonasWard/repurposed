import circleSdf from './shaders/circleSdf.glsl' with {type: "text"};
import squareSdf from './shaders/squareSdf.glsl' with {type: "text"};
import roundedBoxSdf from './shaders/roundedBoxSdf.glsl' with {type: "text"};
import crossSdf from './shaders/crossSdf.glsl' with {type: "text"};
import ringsSdf from './shaders/ringsSdf.glsl' with {type: "text"};
import vesicaSdf from './shaders/vesicaSdf.glsl' with {type: "text"};
import starSdf  from './shaders/starSdf.glsl' with {type: "text"};
import morphingSdf  from './shaders/morphingSdf.glsl' with {type: "text"};

export const sdfLibrary = {
  circleSdf,
  squareSdf,
  roundedBoxSdf,
  crossSdf,
  ringsSdf,
  vesicaSdf,
  starSdf,
  morphingSdf
};
