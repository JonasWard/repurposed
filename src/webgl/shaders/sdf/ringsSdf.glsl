float sdf(vec2 p) {
  return abs(length(p) - 250.) - 25.;
}