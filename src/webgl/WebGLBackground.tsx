import React, { useRef, useEffect, useState, ReactNode } from 'react';
import vertexShaderSource from './shaders/vertexShader.glsl' with {type: "text"};
import fragmentShaderSource from './shaders/fragmentShaderTemplate.glsl' with {type: "text"};
import { preprocessorLibrary } from './shaders/preprocessorLibrary';
import { sdfLibrary } from './shaders/sdfLibrary';
import { colorLibrary } from './shaders/colorLibrary';

interface WebGLBackgroundProps {
  children?: ReactNode;
  sdfFunction?: string; // Custom SDF function as a string (can include getColor function)
  colorFunction?: string; // Custom Color function as a string (can include getColor function)
  preprocessorFunction?: string;
  costumScale?: number
  intensity?: number
  minIntensity?: number
}

const WebGLBackground: React.FC<WebGLBackgroundProps> = ({ children, sdfFunction = sdfLibrary.defaultSdf, colorFunction = colorLibrary.colorMapping, preprocessorFunction = preprocessorLibrary.noscalingProcessor, costumScale = 1.0, intensity = 1.0, minIntensity = 0.0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const fragmentShaderContent = fragmentShaderSource
      .replace('${sdfFunction}', sdfFunction )
      .replace('${colorFunction}', colorFunction)
      .replace('${preProcessor}', preprocessorFunction)
      .replace('${intensity}', intensity.toFixed(5))
      .replace('${minIntensity}', minIntensity.toFixed(5))
      .replaceAll('${scale}', costumScale.toFixed(5));

    // Compile shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderContent);

    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    // Look up attribute and uniform locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');

    // Create buffer for position
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Full screen quad (2 triangles)
    const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Animation variables
    let startTime = performance.now();
    let animationFrameId: number;

    // Render function
    const render = () => {
      if (!canvas) return;

      // Update canvas size if container size changed
      resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

      // Tell WebGL how to convert from clip space to pixels
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      // Clear the canvas
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Use our program
      gl.useProgram(program);

      // Enable the attribute
      gl.enableVertexAttribArray(positionAttributeLocation);

      // Bind the position buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

      // Tell the attribute how to get data out of positionBuffer
      gl.vertexAttribPointer(
        positionAttributeLocation,
        2, // 2 components per iteration
        gl.FLOAT, // the data is 32bit floats
        false, // don't normalize the data
        0, // 0 = move forward size * sizeof(type) each iteration to get the next position
        0 // start at the beginning of the buffer
      );

      // Set the uniforms
      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(timeUniformLocation, (performance.now() - startTime) * 0.001);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Request next frame
      animationFrameId = requestAnimationFrame(render);
    };

    // Start rendering
    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [sdfFunction, dimensions, costumScale, colorFunction, preprocessorFunction]);

  // Helper function to create shader
  function createShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  // Helper function to create program
  function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      console.error(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    return program;
  }

  // Helper function to resize canvas
  function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;

    if (needResize) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      setDimensions({ width: displayWidth, height: displayHeight });
    }

    return needResize;
  }

  // Update dimensions when container size changes
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
      <div className="relative z-10 max-w-[1200px] mx-auto">{children}</div>
    </div>
  );
};

export default WebGLBackground;
