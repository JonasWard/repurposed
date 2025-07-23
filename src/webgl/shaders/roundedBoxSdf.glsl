float roundedBoxSdf(vec2 p, vec2 size, float radius) {
  vec2 d = abs(p) - size + radius;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - radius;
}

float sdf(vec2 p) {
  return roundedBoxSdf(p, vec2(0.6, 0.4), 0.1);
}