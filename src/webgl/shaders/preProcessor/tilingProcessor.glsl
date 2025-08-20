const vec2 tile = vec2(250.0, 250.0);
const float baseDistance = 75.0;

vec2 preProcessor(vec2 p) {
  p -= u_resolution.xy * .5;
  p.y *= u_resolution.x / u_resolution.y;
  
  return abs(mod(p, tile) - tile * .5) - baseDistance;
}