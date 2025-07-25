vec2 preProcessor(vec2 p) {
  const float tileWidth = 4.0;
  const float tileHeight = 4.0;
  
  // Normalize to UV space (0-1)
  vec2 uv = p / u_resolution.xy;
  
  // Tile the UV space
  vec2 tiledUV = fract(uv * vec2(tileWidth, tileHeight));
  
  // Convert back to normalized device coordinates
  return tiledUV * 2.0 - 1.0;
}