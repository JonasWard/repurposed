float vesicaSdf(vec2 p, float w) {
  vec2 p2 = abs(p);
  float d = (p2.y - w) * (p2.y - w) + p2.x * p2.x;
  return sqrt(d) - 0.5;
}

float sdf(vec2 p) {
  return vesicaSdf(p, 0.3);
}