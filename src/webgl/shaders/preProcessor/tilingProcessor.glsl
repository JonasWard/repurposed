const vec2 tile = vec2(400.0, 150.0);
const float baseDistance = 25.0;

vec2 preProcessor(vec2 p) {
  p -= u_resolution.xy * .5;
  p.y *= u_resolution.x / u_resolution.y;
  
  return abs(mod(p, tile) - tile * .5) - baseDistance;
}