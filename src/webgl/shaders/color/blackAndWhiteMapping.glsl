// Custom color function that uses time to offset the phase
vec3 getColor(float d) {
  d = abs(mod(d * 1.0, 2.0) - 1.0);
  d -= mod(d, .125);
  return vec3(d);
}