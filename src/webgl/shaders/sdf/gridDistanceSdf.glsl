float sdf(vec2 p) {
  return 25.0 - max(abs(mod(p.x, 100.0) - 50.), abs(mod(p.y, 100.0) - 50.));
}