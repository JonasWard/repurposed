const vec2 modVec = vec2(300.0, 300.0);
const vec2 boxSize = vec2(80.0, 160.0);
const float boxRadius = 0.0;

float roundedBoxSdf(vec2 p, vec2 size, float radius) {
  vec2 d = abs(p) - size + radius;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - radius;
}

float sdf(vec2 p) {
  float a = (sin(u_time * .25)) * 0.785375;
  // float a = u_time * .25;
  p = rotate(p, a);
  vec2 moddedV = mod(p, modVec);
  vec2 indexes = mod((p - moddedV) / modVec, vec2(2.0));
  // return mod(indexes.x + indexes.y, 2.0) * .25;
  p = mod(p, modVec) - modVec * .5;
  if (mod(indexes.x + indexes.y, 2.0) > .5) {
    p = rotate(p, -a);
  } else {
    p = rotate(p, a);
  }
  float d = roundedBoxSdf(p, boxSize, boxRadius);
  return d;
}