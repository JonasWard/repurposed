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
        colorFunction={colorLibrary.colorMapping}
        costumScale={0.005}
        intensity={0.2}
        minIntensity={0.8}
      >
        <div className="p-8 text-black text-4xl [text-shadow:0_0_10px_rgba(255,255,255,1.0)] h-[100svh]">
          <h1>Noise-based WebGL Background</h1>
          <p>This background uses animated noise functions to create organic shapes.</p>
          <p>The noise creates both the shape and the coloring pattern.</p>
          <div className="h-[200px]"></div>
          <p>The animation is driven by time-based noise displacement.</p>
        </div>
      </WebGLBackground>
      <WebGLBackground
        sdfFunction={sdfLibrary.roundedBoxSdf}
        // preprocessorFunction={preprocessorLibrary.tilingProcessor}
        costumScale={1.0}
        colorFunction={colorLibrary.normalAngleHue}
        intensity={0.45}
        minIntensity={0.55}
      >
        <div className="p-8 text-black text-2xl [text-shadow:0_0_10px_rgba(255,255,255,1.0)] h-[100svh]">
          <h1>WebGL Background Example</h1>
          <p>This content determines the size of the component.</p>
          <p>The WebGL canvas adapts to fit this content.</p>
          <div className="h-[200px]"></div>
          <p>Adding more content changes the canvas size.</p>
        </div>
      </WebGLBackground>
      <WebGLBackground
        sdfFunction={sdfLibrary.morphingSdf}
        colorFunction={colorLibrary.blackAndWhiteMapping}
        preprocessorFunction={preprocessorLibrary.tilingProcessor}
        costumScale={0.1}
      >
        <div className="p-8 text-8xl text-white [text-shadow:0_0_5px_rgba(0,0,0,0.5)] min-h-[100svh]">
          <p className="flex justify-center items-center h-screen">HSV</p>
        </div>
      </WebGLBackground>
      <WebGLBackground sdfFunction={sdfLibrary.quadGridSdf} colorFunction={colorLibrary.colorMapping}>
        <div className="p-8 text-white [text-shadow:0_0_5px_rgba(0,0,0,0.5)] min-h-[100svh]">
          <h1>WebGL Background Example</h1>
          <p>This content determines the size of the component.</p>
          <p>The WebGL canvas adapts to fit this content.</p>
          <div className="h-[200px]"></div>
          <p>Adding more content changes the canvas size.</p>
        </div>
      </WebGLBackground>
      <WebGLBackground sdfFunction={sdfLibrary.hexGridSdf} colorFunction={colorLibrary.colorMapping}>
        <div className="p-8 text-white [text-shadow:0_0_5px_rgba(0,0,0,0.5)] min-h-[100svh]">
          <div className="h-[500px]"></div>
        </div>
      </WebGLBackground>
      <WebGLBackground sdfFunction={sdfLibrary.triangleGridSdf} colorFunction={colorLibrary.hsvMapping}>
        <div className="p-8 text-white [text-shadow:0_0_5px_rgba(0,0,0,0.5)] min-h-[100svh]">
          <div className="h-[500px]"></div>
        </div>
      </WebGLBackground>
      <WebGLBackground sdfFunction={sdfLibrary.ringsSdf}>
        <div className="p-8 text-white [text-shadow:0_0_5px_rgba(0,0,0,0.5)] min-h-[100svh]">
          <h1>WebGL Background Example</h1>
          <p>This content determines the size of the component.</p>
          <p>The WebGL canvas adapts to fit this content.</p>
          <div className="h-[200px]"></div>
          <p>Adding more content changes the canvas size.</p>
        </div>
      </WebGLBackground>
      <WebGLBackground sdfFunction={sdfLibrary.vesicaSdf} colorFunction={colorLibrary.hsvMapping}>
        <div className="p-8 text-white [text-shadow:0_0_5px_rgba(0,0,0,0.5)] min-h-[100svh]">
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