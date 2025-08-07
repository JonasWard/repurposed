const float size = 120.0;
const float halfSize = 60.0;
const float lineWidth = 10.0;
const vec2 d0 = vec2(0.0, -1.0);
const vec2 d1 = vec2(-.866025, .5);
const vec2 d2 = vec2(.866025, .5);

// Triangle grid SDF
float sdf(vec2 p) {
  // Triangle grid size
  float t0 = abs(mod(dot(d0, p)- halfSize, size) - halfSize) - lineWidth;
  float t1 = abs(mod(dot(d1, p)- halfSize, size) - halfSize) - lineWidth;
  float t2 = abs(mod(dot(d2, p)- halfSize, size) - halfSize) - lineWidth;
  
  return min(t0, min(t1, t2));
}