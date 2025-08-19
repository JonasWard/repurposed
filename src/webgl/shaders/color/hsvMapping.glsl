// HSV to RGB conversion function
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// Custom color function using HSV color space for dynamic color mapping
vec3 getColor(float d) {
  // Use the distance value to determine the hue
  // Map distance to a cyclical hue value (0.0 to 1.0)
  d *= .005;
  float hue = fract(abs(d) * 3.0 + u_time * 0.1);
  
  // Inside vs outside coloring
  float sat = 0.8;
  float val = 0.9;
  
  // Adjust saturation based on distance from surface
  // More saturated near the surface, less saturated far away
  sat *= 1.0 - smoothstep(0.0, 0.5, abs(d));
  
  // Adjust value (brightness) based on whether we're inside or outside
  // Brighter outside, darker inside
  val *= sign(d) * 0.5 + 0.5;
  
  // Add pulsing effect
  float pulse = sin(u_time * 2.0) * 0.5 + 0.5;
  sat = mix(sat, sat * 0.7, pulse * 0.3);
  
  // Create base color from HSV
  vec3 color = hsv2rgb(vec3(hue, .45, 1.0));
  
  // Add edge highlighting
  float edgeWidth = 0.01 + 0.005 * sin(u_time * 3.0);
  float edgeIntensity = 1.0 - smoothstep(0.0, edgeWidth, abs(d));
  
  // Pulse the edge color based on time
  vec3 edgeColor = hsv2rgb(vec3(fract(u_time * 0.05), 0.8, 1.0));
  
  // Mix the base color with the edge highlight
  color = mix(color, edgeColor, edgeIntensity * 0.8);
  
  // Add subtle bands/rings based on distance
  float bands = sin(d * 5.0 + u_time) * 0.5 + 0.5;
  color *= 0.8 + 0.2 * bands;
  
  return color;
}