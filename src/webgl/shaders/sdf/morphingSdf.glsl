float circleSdf(vec2 p) {
  return length(p) - 5.0;
}

float squareSdf(vec2 p) {
  vec2 d = abs(p) - vec2(2.5);
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float sdf(vec2 p) {
  float circle = circleSdf(p + vec2(-1, 1));
  float square = squareSdf(p + vec2(1, -1));
  
  // Use sin of time to oscillate between circle and square
  float t = sin(u_time) * 0.5 + 0.5;
  return mix(circle, square, t);
}