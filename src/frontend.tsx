/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router';
import { App } from './App';
import { WebGLBackgroundExample } from './webgl';

let router = createHashRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'webgl',
    element: <WebGLBackgroundExample />
  }
]);

function start() {
  const root = createRoot(document.getElementById('root')!);
  root.render(<RouterProvider router={router} />);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
