float sdPolygon(vec2 p) {
    vec2 vertices[${pointCount}] = vec2[](
        ${pointsAsVec2}
    );
    
    int N = ${pointCount};
    float d = dot(p - vertices[0], p - vertices[0]);
    float s = 1.0;
    
    for (int i = 0, j = N - 1; i < N; j = i, i++) {
        vec2 e = vertices[j] - vertices[i];
        vec2 w = p - vertices[i];
        vec2 b = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);
        d = min(d, dot(b, b));
        
        bvec3 c = bvec3(p.y >= vertices[i].y, p.y < vertices[j].y, e.x * w.y > e.y * w.x);
        if (all(c) || all(not(c))) s *= -1.0;
    }
    
    return s * sqrt(d);
}
