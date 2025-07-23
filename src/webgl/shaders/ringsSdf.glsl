float sdf(vec2 p) {
  return abs(length(p) - 0.5) - 0.05;
}