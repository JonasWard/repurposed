float sdf(vec2 p) {
  // Simple circle SDF
  return length(p) - 0.5;
}
