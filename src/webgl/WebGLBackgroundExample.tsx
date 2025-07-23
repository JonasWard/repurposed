import React from 'react';
import WebGLBackground from './WebGLBackground';
import { sdfLibrary } from './shaders/sdfLibrary';
import { colorLibrary } from './shaders/colorLibrary';
import { preprocessorLibrary } from './shaders/preprocessorLibrary';

const WebGLBackgroundExample: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <WebGLBackground
        sdfFunction={sdfLibrary.noiseSimplex}
        colorFunction={colorLibrary.blackAndWhiteMapping}
        preprocessorFunction={preprocessorLibrary.pixelateProcessor}
        costumScale={0.15}
      >
        <div className="p-8 text-white [text-shadow:0_0_5px_rgba(0,0,0,0.5)]">
          <h1>Noise-based WebGL Background</h1>
          <p>This background uses animated noise functions to create organic shapes.</p>
          <p>The noise creates both the shape and the coloring pattern.</p>
          <div className="h-[200px]"></div>
          <p>The animation is driven by time-based noise displacement.</p>
        </div>
      </WebGLBackground>
      <WebGLBackground sdfFunction={sdfLibrary.roundedBoxSdf}>
        <div className="p-8 text-white [text-shadow:0_0_5px_rgba(0,0,0,0.5)]">
          <h1>WebGL Background Example</h1>
          <p>This content determines the size of the component.</p>
          <p>The WebGL canvas adapts to fit this content.</p>
          <div className="h-[200px]"></div>
          <p>Adding more content changes the canvas size.</p>
          <p>.</p>
          <p>.</p>
          <p>.</p>
          <p>.</p>
          <p>.</p>
          <p>.</p>
          <p>.</p>
        </div>
      </WebGLBackground>
      <WebGLBackground
        sdfFunction={sdfLibrary.morphingSdf}
        colorFunction={colorLibrary.blackAndWhiteMapping}
        preprocessorFunction={preprocessorLibrary.pixelateProcessor}
        costumScale={0.0025}
      >
        <div className="p-8 text-white [text-shadow:0_0_5px_rgba(0,0,0,0.5)]">
          <h1>WebGL Background Example</h1>
          <p>This content determines the size of the component.</p>
          <p>The WebGL canvas adapts to fit this content.</p>
          <div className="h-[200px]"></div>
          <p>Adding more content changes the canvas size.</p>
        </div>
      </WebGLBackground>
      <WebGLBackground sdfFunction={sdfLibrary.ringsSdf}>
        <div className="p-8 text-white [text-shadow:0_0_5px_rgba(0,0,0,0.5)]">
          <h1>WebGL Background Example</h1>
          <p>This content determines the size of the component.</p>
          <p>The WebGL canvas adapts to fit this content.</p>
          <div className="h-[200px]"></div>
          <p>Adding more content changes the canvas size.</p>
        </div>
      </WebGLBackground>
      <WebGLBackground sdfFunction={sdfLibrary.vesicaSdf} colorFunction={colorLibrary.hsvMapping}>
        <div className="p-8 text-white [text-shadow:0_0_5px_rgba(0,0,0,0.5)]">
          <h1>WebGL Background Example</h1>
          <p>This content determines the size of the component.</p>
          <p>The WebGL canvas adapts to fit this content.</p>
          <div className="h-[200px]"></div>
          <p>Adding more content changes the canvas size.</p>
        </div>
      </WebGLBackground>
    </div>
  );
};

export default WebGLBackgroundExample;