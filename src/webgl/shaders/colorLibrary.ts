import colorMapping  from './color/distanceMapping.glsl' with {type: "text"};
import hsvMapping from './color/hsvMapping.glsl' with {type: "text"}
import blackAndWhiteMapping from './color/blackAndWhiteMapping.glsl' with {type: "text"}
import redScale from './color/redscale.glsl' with {type: "text"}
import normalAngleHue from './color/normalAngleHue.glsl' with {type: "text"}

export const colorLibrary = {
  colorMapping,
  hsvMapping,
  blackAndWhiteMapping,
  redScale,
  normalAngleHue
}