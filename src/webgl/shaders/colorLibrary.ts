import colorMapping  from './color/distanceMapping.glsl' with {type: "text"};
import hsvMapping from './color/hsvMapping.glsl' with {type: "text"}
import blackAndWhiteMapping from './color/blackAndWhiteMapping.glsl' with {type: "text"}

export const colorLibrary = {
  colorMapping,
  hsvMapping,
  blackAndWhiteMapping,
}