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