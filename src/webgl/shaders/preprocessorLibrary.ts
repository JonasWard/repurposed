import pixelateProcessor from './preProcessor/pixelateProcessor.glsl' with {type: "text"}
import defaultProcessor from './preProcessor/defaultProcessor.glsl' with {type: "text"}

export const preprocessorLibrary = {
  pixelateProcessor,
  defaultProcessor
}