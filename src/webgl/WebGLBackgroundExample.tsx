import React from 'react';
import WebGLBackground from './WebGLBackground';
import customSdf from './shaders/customSdf.glsl' with {type: "text"};

const WebGLBackgroundExample: React.FC = () => {
  // Custom SDF function - will be loaded from file

  return (
    <>
      <WebGLBackground sdfFunction={customSdf}>
        <div
          style={{
            padding: '2rem',
            color: 'white',
            textShadow: '0 0 5px rgba(0,0,0,0.5)'
          }}
        >
          <h1>WebGL Background Example</h1>
          <p>This content determines the size of the component.</p>
          <p>The WebGL canvas adapts to fit this content.</p>
          <div style={{ height: '200px' }}></div>
          <p>Adding more content changes the canvas size.</p>
        </div>
      </WebGLBackground>
      <WebGLBackground sdfFunction={customSdf}>
        <div
          style={{
            padding: '2rem',
            color: 'white',
            textShadow: '0 0 5px rgba(0,0,0,0.5)'
          }}
        >
          <h1>WebGL Background Example</h1>
          <p>This content determines the size of the component.</p>
          <p>The WebGL canvas adapts to fit this content.</p>
          <div style={{ height: '200px' }}></div>
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
      <WebGLBackground sdfFunction={customSdf}>
        <div
          style={{
            padding: '2rem',
            color: 'white',
            textShadow: '0 0 5px rgba(0,0,0,0.5)'
          }}
        >
          <h1>WebGL Background Example</h1>
          <p>This content determines the size of the component.</p>
          <p>The WebGL canvas adapts to fit this content.</p>
          <div style={{ height: '200px' }}></div>
          <p>Adding more content changes the canvas size.</p>
        </div>
      </WebGLBackground>
      <WebGLBackground sdfFunction={customSdf}>
        <div
          style={{
            padding: '2rem',
            color: 'white',
            textShadow: '0 0 5px rgba(0,0,0,0.5)'
          }}
        >
          <h1>WebGL Background Example</h1>
          <p>This content determines the size of the component.</p>
          <p>The WebGL canvas adapts to fit this content.</p>
          <div style={{ height: '200px' }}></div>
          <p>Adding more content changes the canvas size.</p>
        </div>
      </WebGLBackground>
      <WebGLBackground sdfFunction={customSdf}>
        <div
          style={{
            padding: '2rem',
            color: 'white',
            textShadow: '0 0 5px rgba(0,0,0,0.5)'
          }}
        >
          <h1>WebGL Background Example</h1>
          <p>This content determines the size of the component.</p>
          <p>The WebGL canvas adapts to fit this content.</p>
          <div style={{ height: '200px' }}></div>
          <p>Adding more content changes the canvas size.</p>
        </div>
      </WebGLBackground>
    </>
  );
};

export default WebGLBackgroundExample;
