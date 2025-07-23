vec2 preProcessor(vec2 p) {
  p /= 3.0;
  return p - mod(p, 1.0);
}