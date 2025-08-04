float sdPolyline(vec2 p) {
    vec2 vertices[${pointCount}] = vec2[](
        ${pointsAsVec2}
    );
    
    int N = ${pointCount};
    float d = 1e10; // Start with a large distance
    
    // Calculate distance to each line segment
    for (int i = 0; i < N - 1; i++) {
        vec2 a = vertices[i];
        vec2 b = vertices[i + 1];
        vec2 pa = p - a;
        vec2 ba = b - a;
        float h = abs(clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0));
        vec2 closest = a + h * ba;
        d = abs(min(d, distance(p, closest)));
    }
    
    return d - ${thickness} * 0.5;
}