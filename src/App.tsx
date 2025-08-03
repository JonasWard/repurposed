import React, { useState, useMemo } from 'react';
import './index.css';
import WebGLBackground from './webgl/WebGLBackground';
import { parseSvg } from './svg/svgparse';
import { getDistanceMethod } from './svg/sdfcompile';
import { colorLibrary } from './webgl/shaders/colorLibrary';

const defaultSvg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" />
  <rect x="100" y="20" width="60" height="40" />
  <polygon points="150,100 180,150 120,150" />
  <polyline points="20,120 60,140 100,120 140,140" stroke-width="5" />
</svg>`;

const colorMappingOptions = [
  { key: 'colorMapping', label: 'Distance Mapping', value: colorLibrary.colorMapping },
  { key: 'hsvMapping', label: 'HSV Mapping', value: colorLibrary.hsvMapping },
  { key: 'blackAndWhiteMapping', label: 'Black & White', value: colorLibrary.blackAndWhiteMapping }
];

export function App() {
  const [svgInput, setSvgInput] = useState(defaultSvg);
  const [selectedColorMapping, setSelectedColorMapping] = useState(colorMappingOptions[0]);
  const [scale, setScale] = useState(1.0);

  const sdfFunction = useMemo(() => {
    try {
      const geometries = parseSvg(svgInput);
      if (geometries.length === 0) {
        return 'float sdf(vec2 p) { return length(p) - 50.0; }'; // fallback circle
      }
      return getDistanceMethod(...geometries);
    } catch (error) {
      console.error('Error parsing SVG:', error);
      return 'float sdf(vec2 p) { return length(p) - 50.0; }'; // fallback circle
    }
  }, [svgInput]);

  return (
    <div className="w-full h-screen">
      <WebGLBackground sdfFunction={sdfFunction} colorFunction={selectedColorMapping.value} costumScale={scale}>
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-4xl font-bold mb-6 text-white">SVG Distance Field Renderer</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SVG Input */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-3 text-white">SVG Input</h2>
              <textarea
                value={svgInput}
                onChange={(e) => setSvgInput(e.target.value)}
                className="w-full h-40 p-3 bg-gray-800 text-white rounded border border-gray-600 font-mono text-sm"
                placeholder="Enter SVG markup here..."
              />
            </div>

            {/* Controls */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-3 text-white">Controls</h2>

              {/* Color Mapping Selection */}
              <div className="mb-4">
                <label className="block text-white mb-2">Color Mapping:</label>
                <select
                  value={selectedColorMapping.key}
                  onChange={(e) => {
                    const option = colorMappingOptions.find((opt) => opt.key === e.target.value);
                    if (option) setSelectedColorMapping(option);
                  }}
                  className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600"
                >
                  {colorMappingOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Scale Control */}
              <div className="mb-4">
                <label className="block text-white mb-2">Scale: {scale.toFixed(2)}</label>
                <input
                  type="range"
                  min="0.1"
                  max="5.0"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Info */}
              <div className="text-sm text-gray-300">
                <p className="mb-2">Supported SVG elements:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Circle</li>
                  <li>Rectangle</li>
                  <li>Polygon</li>
                  <li>Polyline (with stroke-width)</li>
                  <li>Line (with stroke-width)</li>
                  <li>Path (basic support)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Example SVGs */}
          <div className="mt-6 bg-black/20 backdrop-blur-sm rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-3 text-white">Example SVGs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setSvgInput(defaultSvg)}
                className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded text-left text-sm"
              >
                <div className="font-semibold mb-1">Mixed Shapes</div>
                <div className="text-gray-300">Circle, rect, polygon, polyline</div>
              </button>

              <button
                onClick={() =>
                  setSvgInput(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80" />
  <circle cx="100" cy="100" r="50" />
  <circle cx="100" cy="100" r="20" />
</svg>`)
                }
                className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded text-left text-sm"
              >
                <div className="font-semibold mb-1">Concentric Circles</div>
                <div className="text-gray-300">Multiple circles</div>
              </button>

              <button
                onClick={() =>
                  setSvgInput(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <polyline points="20,20 180,20 180,180 20,180 20,100 100,100 100,60" stroke-width="8" />
</svg>`)
                }
                className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded text-left text-sm"
              >
                <div className="font-semibold mb-1">Thick Line</div>
                <div className="text-gray-300">Complex polyline path</div>
              </button>
            </div>
          </div>
        </div>
      </WebGLBackground>
    </div>
  );
}

export default App;
