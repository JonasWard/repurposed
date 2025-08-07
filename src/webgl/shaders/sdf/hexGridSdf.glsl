const float radius = 80.0;
const float thickness = 15.0;

// Hexagonal grid SDF
float sdf(vec2 p) {
  p /= vec2(2.0, sqrt(3.0)) * radius;
    p.y -= .5;
    p.x -= fract(floor(p.y) * .5);
    p = abs(fract(p) - .5);
    return abs(1.0 - max(p.x + p.y * 1.5, p.x * 2.0)) * radius - thickness;
}