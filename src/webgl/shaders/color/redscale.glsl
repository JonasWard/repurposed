vec3 getColor(float d) {
  d *= 0.002;
  if (d > 0.0) {
    return vec3(d, 0.0, 0.0);
  }
  return vec3(0.0,0.0,1.0-d);
}