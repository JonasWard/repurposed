import pixelateProcessor from './preProcessor/pixelateProcessor.glsl' with {type: "text"}
import defaultProcessor from './preProcessor/defaultProcessor.glsl' with {type: "text"}
import tilingProcessor from './preProcessor/tilingProcessor.glsl' with {type: "text"}
import tilingSymmetricProcessor from './preProcessor/tilingSymmetricProcessor.glsl' with {type: "text"}
import noscalingProcessor from './preProcessor/noscalingProcessor.glsl' with {type: "text"}

export const preprocessorLibrary = {
  pixelateProcessor,
  defaultProcessor,
  tilingProcessor,
  tilingSymmetricProcessor,
  noscalingProcessor
}