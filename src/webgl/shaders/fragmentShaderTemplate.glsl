precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

const float scale = ${scale};

// SDF function will be imported here
${sdfFunction}

// Colr function will be imported here
${colorFunction}

void main() {
  // Convert pixel coordinates to normalized device coordinates
  vec2 st = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
  
  // Adjust for aspect ratio
  st.y *= u_resolution.y / u_resolution.x;
  
  // Calculate distance using the SDF function
  float d = sdf(st * scale);
  
  // Use the getColor function to visualize the SDF with time-based effects
  vec3 color = getColor(d / scale);
  
  gl_FragColor = vec4(color, 1.0);
}