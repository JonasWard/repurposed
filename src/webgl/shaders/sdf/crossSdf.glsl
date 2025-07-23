float sdf(vec2 p) {
  float horizontal = max(abs(p.x) - 0.6, abs(p.y) - 0.2);
  float vertical = max(abs(p.x) - 0.2, abs(p.y) - 0.6);
  return min(horizontal, vertical);
}