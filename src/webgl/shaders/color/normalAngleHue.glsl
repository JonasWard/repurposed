// HSV to RGB conversion function
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// Calculate normal using finite differences
vec2 getNormal(vec2 p) {
  float eps = 0.001;
  float dx = sdf(p + vec2(eps, 0.0)) - sdf(p - vec2(eps, 0.0));
  float dy = sdf(p + vec2(0.0, eps)) - sdf(p - vec2(0.0, eps));
  return normalize(vec2(dx, dy));
}

// Custom color function using normal angle as hue with distance-based white lines
vec3 getColor(float d) {
  // Calculate position for normal computation
  vec2 st = preProcessor(gl_FragCoord.xy);
  st.y *= u_resolution.y / u_resolution.x;
  vec2 p = st * scale;
  
  // Calculate normal at this point
  vec2 normal = getNormal(p);
  
  // Convert normal angle to hue (0.0 to 1.0)
  float angle = atan(normal.y, normal.x);
  float hue = (angle + 3.14159) / (2.0 * 3.14159); // Normalize to 0-1
  
  // Adjust saturation based on distance - decrease with larger distance
  float saturation = 0.8 * exp(-abs(d) * 0.005);
  
  // Adjust value (brightness) based on sign of distance
  // Increase brightness for positive (outside), decrease for negative (inside)
  float value = 0.7 + sign(d) * 0.3;
  
  // Create base color from normal angle with distance-based adjustments
  vec3 color = hsv2rgb(vec3(hue, saturation, value));
  
  // Add smooth white lines every 10 units of distance
  float lineSpacing = 20.0;
  float lineWidth = 1.5;
  
  // Calculate distance modulo for repeating lines
  float distMod = mod(abs(d), lineSpacing);
  float lineIntensity = 1.0 - smoothstep(0.0, lineWidth, min(distMod, lineSpacing - distMod));
  
  // Mix with white for the lines
  color = mix(color, vec3(1.0), lineIntensity);
  
  return color;
}