const vec2 gridSize = vec2(200.0);
const float baseDistance = 80.0;

float sdf(vec2 p) {
  p = abs(mod(p, gridSize) - gridSize * .5);
  return baseDistance - max(p.x, p.y);
}