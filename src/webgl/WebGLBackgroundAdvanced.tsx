import React, { useState, useEffect } from 'react';
import WebGLBackground from './WebGLBackground';
import { sdfLibrary } from './sdfLibrary';

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
            alignItems: 'center'
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
              margin: '20px 0'
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
                  cursor: 'pointer'
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
              maxWidth: '600px'
            }}
          >
            <h3>About Signed Distance Fields (SDFs)</h3>
            <p>
              SDFs define shapes by calculating the distance from any point to the nearest surface. Negative values are
              inside the shape, positive values are outside, and zero is exactly on the surface.
            </p>
            <p>
              This makes them perfect for rendering shapes in fragment shaders and creating smooth transitions between
              different geometries.
            </p>
          </div>
        </div>
      </WebGLBackground>
    </div>
  );
};

export default WebGLBackgroundAdvanced;
