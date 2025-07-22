# WebGL Background Component

A React component that creates a full-screen WebGL canvas background that adapts to the size of its content. The component uses Signed Distance Fields (SDFs) to render shapes in the fragment shader.

## Features

- Full-screen WebGL canvas that automatically resizes based on content
- Customizable SDF functions for creating different shapes and effects
- Responsive design that adapts to container size changes
- Optimized rendering with RequestAnimationFrame
- TypeScript support

## Usage

### Basic Usage

```tsx
import WebGLBackground from './components/WebGLBackground';

const MyComponent = () => {
  return (
    <WebGLBackground>
      <div>Your content here</div>
    </WebGLBackground>
  );
};
```

### Custom SDF Function

You can provide a custom SDF function to create different shapes:

```tsx
import WebGLBackground from './components/WebGLBackground';

const MyComponent = () => {
  const customSdf = `
    float sdf(vec2 p) {
      // Create a circle with radius 0.5
      return length(p) - 0.5;
    }
  `;

  return (
    <WebGLBackground sdfFunction={customSdf}>
      <div>Your content here</div>
    </WebGLBackground>
  );
};
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Content to display over the WebGL background |
| `sdfFunction` | string | Custom SDF function as a string. Must define a function called `sdf` that takes a vec2 parameter and returns a float |

## SDF Examples

### Circle

```glsl
float sdf(vec2 p) {
  return length(p) - 0.5;
}
```

### Rectangle

```glsl
float sdf(vec2 p) {
  vec2 d = abs(p) - vec2(0.6, 0.4);
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}
```

### Rounded Rectangle

```glsl
float roundedRectSdf(vec2 p, vec2 size, float radius) {
  vec2 d = abs(p) - size + radius;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - radius;
}

float sdf(vec2 p) {
  return roundedRectSdf(p, vec2(0.7, 0.4), 0.1);
}
```

### Multiple Shapes (Union)

```glsl
float sdf(vec2 p) {
  float circle = length(p) - 0.5;
  float box = max(abs(p.x) - 0.3, abs(p.y) - 0.3);
  return min(circle, box); // Union of shapes
}
```

## Advanced Usage

See the `WebGLBackgroundAdvanced.tsx` file for examples of more complex SDF functions and how to switch between different shapes dynamically.

## Performance Considerations

- The WebGL canvas is redrawn on every animation frame, which can be CPU/GPU intensive
- For static backgrounds, consider setting a flag to disable animation
- Large canvases may impact performance on mobile devices