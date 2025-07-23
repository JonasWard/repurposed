vec2 preProcessor(vec2 p) {
  return p / u_resolution.xy * 2.0 - 1.0;
}