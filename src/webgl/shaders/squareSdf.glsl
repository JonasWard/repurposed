float sdf(vec2 p) {
  vec2 d = abs(p) - vec2(0.5);
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}