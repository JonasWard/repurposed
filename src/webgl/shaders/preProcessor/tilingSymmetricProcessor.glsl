vec2 preProcessor(vec2 p) {
  const float tileWidth = 8.0;
  const float tileHeight = 4.0;
  
  // Normalize to UV space (0-1)
  vec2 uv = p / u_resolution.xy;
  
  // Tile the UV space
  vec2 tiledUV = fract(uv * vec2(tileWidth, tileHeight));
  
  // Get tile indices to determine flip direction
  vec2 tileIndex = floor(uv * vec2(tileWidth, tileHeight));
  
  // Flip every other tile for edge symmetry
  if (mod(tileIndex.x, 2.0) == 1.0) {
    tiledUV.x = 1.0 - tiledUV.x;
  }
  if (mod(tileIndex.y, 2.0) == 1.0) {
    tiledUV.y = 1.0 - tiledUV.y;
  }
  
  // Convert back to normalized device coordinates
  return tiledUV * 2.0 - 1.0;
}