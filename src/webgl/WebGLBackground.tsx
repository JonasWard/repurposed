import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface WebGLBackgroundProps {
  children?: ReactNode;
  sdfFunction?: string; // Custom SDF function as a string (can include getColor function)
}

const WebGLBackground: React.FC<WebGLBackgroundProps> = ({ children, sdfFunction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Default SDF function if none provided
  const defaultSdfFunction = `
    float sdf(vec2 p) {
      // Simple circle SDF
      return length(p) - 0.5;
    }
    
    // Default color function
    vec3 getColor(float d) {
      vec3 color = vec3(1.0) - sign(d) * vec3(0.1, 0.4, 0.7);
      color *= 1.0 - exp(-6.0 * abs(d));
      color *= 0.8 + 0.2 * cos(150.0 * d);
      color = mix(color, vec3(1.0), 1.0 - smoothstep(0.0, 0.01, abs(d)));
      return color;
    }
  `;

  // Initialize WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Create shader program
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      
      ${sdfFunction || defaultSdfFunction}
      
      void main() {
        // Convert pixel coordinates to normalized device coordinates
        vec2 st = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
        
        // Adjust for aspect ratio
        st.y *= u_resolution.y / u_resolution.x;
        
        // // Calculate distance using the SDF function
        float d = sdf(st);
        // float d = sdf(gl_FragCoord.xy - u_resolution.xy * .5);
        
        // Use the getColor function to visualize the SDF with time-based effects
        vec3 color = getColor(d);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

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
  }, [sdfFunction, dimensions]);

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
    <div ref={containerRef} className="relative w-[100svw] h-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default WebGLBackground;
