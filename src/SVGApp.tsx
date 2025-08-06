import { useState, useMemo } from 'react';
import './index.css';
import WebGLBackground from './webgl/WebGLBackground';
import { parseSvg } from './svg/svgparse';
import { getDistanceMethod } from './svg/sdfcompile';
import { colorLibrary } from './webgl/shaders/colorLibrary';
import { preprocessorLibrary } from './webgl/shaders/preprocessorLibrary';

const defaultSvg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="0" cy="0" r="30" />
  <rect transform="scale(1.0,2.5) rotate(18)" x="50" y="-30" width="60" height="40" />
  <polygon points="100,50 130,100 70,100" />
  <polyline points="-70,50 10,90 50,70 90,90" stroke-width="5" />
</svg>`;

const circleSvg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80" />
  <circle cx="0" cy="0" r="50" />
  <circle cx="-100" cy="-100" r="20" />
</svg>`;

const polylineSvg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <polyline points="20,20 180,20 180,180 20,180 20,100 100,100 100,60" stroke-width="8" />
</svg>`;

const colorMappingOptions = Object.entries(colorLibrary).map(([key, value]) => ({ key, label: key, value }));

export function App() {
  const [svgInput, setSvgInput] = useState(defaultSvg);
  const [selectedColorMapping, setSelectedColorMapping] = useState(colorMappingOptions[0]);
  const [scale, setScale] = useState(1.0);
  const [showConfig, setShowConfig] = useState(false);

  const sdfFunction = useMemo(() => {
    try {
      const geometries = parseSvg(svgInput);
      if (geometries.length === 0) {
        return 'float sdf(vec2 p) { return length(p) - 50.0; }'; // fallback circle
      }
      const sdf = getDistanceMethod(...geometries);
      console.log(sdf);
      return sdf;
    } catch (error) {
      console.error('Error parsing SVG:', error);
      return 'float sdf(vec2 p) { return length(p) - 50.0; }'; // fallback circle
    }
  }, [svgInput]);

  return (
    <div className="w-full h-screen">
      <WebGLBackground
        sdfFunction={sdfFunction}
        colorFunction={selectedColorMapping.value}
        preprocessorFunction={preprocessorLibrary.noscalingProcessor}
        costumScale={scale}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="mx-3 mt-3 z-10 bg-black/50 hover:bg-black/70 text-white px-2 rounded-lg backdrop-blur-sm border border-gray-600 transition-colors"
          title={showConfig ? 'Hide Configuration' : 'Show Configuration'}
        >
          {showConfig ? 'Hide Config' : 'Show Config'}
        </button>
        <div className="absolute h-[calc(100svh-36px)] max-h-[calc(100svh-12px)] overflow-auto w-full">
          {showConfig && (
            <div className="m-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
              <div className="mt-3 bg-black/20 backdrop-blur-sm rounded-lg p-4">
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
                    onClick={() => setSvgInput(circleSvg)}
                    className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded text-left text-sm"
                  >
                    <div className="font-semibold mb-1">Concentric Circles</div>
                    <div className="text-gray-300">Multiple circles</div>
                  </button>

                  <button
                    onClick={() => setSvgInput(polylineSvg)}
                    className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded text-left text-sm"
                  >
                    <div className="font-semibold mb-1">Thick Line</div>
                    <div className="text-gray-300">Complex polyline path</div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </WebGLBackground>
    </div>
  );
}

export default App;
