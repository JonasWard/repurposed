vec2 preProcessor(vec2 p) {
  p -= u_resolution.xy * .5;
  p.y *= u_resolution.x /  u_resolution.y;
  return p;
}