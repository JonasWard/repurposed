import React, { useState } from 'react';
import WebGLBackground from './WebGLBackground';

// Collection of different SDF functions
const sdfLibrary = {
  circle: `
    float sdf(vec2 p) {
      return length(p) - 0.5;
    }
  `,

  square: `
    float sdf(vec2 p) {
      vec2 d = abs(p) - vec2(0.5);
      return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
    }
  `,

  roundedBox: `
    float roundedBoxSdf(vec2 p, vec2 size, float radius) {
      vec2 d = abs(p) - size + radius;
      return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - radius;
    }
    
    float sdf(vec2 p) {
      return roundedBoxSdf(p, vec2(0.6, 0.4), 0.1);
    }
  `,

  cross: `
    float sdf(vec2 p) {
      float horizontal = max(abs(p.x) - 0.6, abs(p.y) - 0.2);
      float vertical = max(abs(p.x) - 0.2, abs(p.y) - 0.6);
      return min(horizontal, vertical);
    }
  `,

  rings: `
    float sdf(vec2 p) {
      return abs(length(p) - 0.5) - 0.05;
    }
  `,

  vesica: `
    float vesicaSdf(vec2 p, float w) {
      vec2 p2 = abs(p);
      float d = (p2.y - w) * (p2.y - w) + p2.x * p2.x;
      return sqrt(d) - 0.5;
    }
    
    float sdf(vec2 p) {
      return vesicaSdf(p, 0.3);
    }
  `,

  star: `
    float starSdf(vec2 p, float r, int n, float m) {
      float an = 3.141593 / float(n);
      float en = 3.141593 / m;
      vec2 acs = vec2(cos(an), sin(an));
      vec2 ecs = vec2(cos(en), sin(en));
      
      float bn = mod(atan(p.x, p.y), 2.0 * an) - an;
      p = length(p) * vec2(cos(bn), abs(sin(bn)));
      p -= r * acs;
      p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);
      
      return length(p) * sign(p.x);
    }
    
    float sdf(vec2 p) {
      return starSdf(p, 0.5, 5, 2.0);
    }
  `,

  morphing: `
    float circleSdf(vec2 p) {
      return length(p) - 0.5;
    }
    
    float squareSdf(vec2 p) {
      vec2 d = abs(p) - vec2(0.5);
      return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
    }
    
    float sdf(vec2 p) {
      float circle = circleSdf(p);
      float square = squareSdf(p);
      
      // Use sin of time to oscillate between circle and square
      float t = sin(u_time) * 0.5 + 0.5;
      return mix(circle, square, t);
    }
  `,
};

const WebGLBackgroundAdvanced: React.FC = () => {
  const [currentSdf, setCurrentSdf] = useState('morphing');

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <WebGLBackground sdfFunction={sdfLibrary[currentSdf as keyof typeof sdfLibrary]}>
        <div
          style={{
            padding: '2rem',
            color: 'white',
            textShadow: '0 0 5px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1>WebGL SDF Background</h1>
          <p>Select a shape to display:</p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              margin: '20px 0',
            }}
          >
            {Object.keys(sdfLibrary).map((sdfName) => (
              <button
                key={sdfName}
                onClick={() => setCurrentSdf(sdfName)}
                style={{
                  padding: '8px 16px',
                  background: currentSdf === sdfName ? '#4a90e2' : '#333',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {sdfName.charAt(0).toUpperCase() + sdfName.slice(1)}
              </button>
            ))}
          </div>

          <div
            style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'rgba(0,0,0,0.5)',
              borderRadius: '8px',
              maxWidth: '600px',
            }}
          >
            <h3>About Signed Distance Fields (SDFs)</h3>
            <p>
              SDFs define shapes by calculating the distance from any point to the nearest surface. Negative values are inside the shape, positive
              values are outside, and zero is exactly on the surface.
            </p>
            <p>This makes them perfect for rendering shapes in fragment shaders and creating smooth transitions between different geometries.</p>
          </div>
        </div>
      </WebGLBackground>
    </div>
  );
};

export default WebGLBackgroundAdvanced;
