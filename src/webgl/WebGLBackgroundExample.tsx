import React from 'react';
import WebGLBackground from './WebGLBackground';

const WebGLBackgroundExample: React.FC = () => {
  // Custom SDF function - creates a rounded rectangle with time-based color phase
  const customSdf = `
    float roundedRectSdf(vec2 p, vec2 size, float radius) {
      vec2 d = abs(p) - size + radius;
      return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - radius;
    }
    
    float sdf(vec2 p) {
      // Create a stable rounded rectangle (geometry doesn't change with time)
      return roundedRectSdf(p, vec2(0.7, 0.4), 0.1);
    }
    
    // Custom color function that uses time to offset the phase
    vec3 getColor(float d) {
      // Base color calculation
      vec3 color = vec3(1.0) - sign(d) * vec3(0.1, 0.4, 0.7);
      
      // Add time-based phase offset to the color
      float phase = u_time * 10.0;
      color *= 1.0 - exp(-6.0 * abs(d));
      color *= 0.8 + 0.2 * cos(150.0 * d + phase);
      
      // Add pulsing glow effect based on time
      float glow = 1.0;
      color = mix(color, vec3(1.0), 1.0 - smoothstep(0.0, 0.01 + 0.02 * glow, abs(d)));
      
      return color;
    }
  `;

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
