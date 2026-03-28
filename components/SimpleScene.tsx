import { Box, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export const SimpleScene: React.FC<{ withOrbitControls?: boolean; className?: string }> = ({
  withOrbitControls = true,
  className = ''
}) => {
  return (
    <Canvas className={`bg-black ${className}`} camera={{ position: [2, 0, 2] }}>
      {withOrbitControls && <OrbitControls />}
      <directionalLight position={[10, 2, 3]} intensity={1} />
      <directionalLight position={[-10, -2, -3]} intensity={0.5} />
      <Box args={[1, 1, 1]} castShadow receiveShadow>
        <meshStandardMaterial color="white" />
      </Box>
    </Canvas>
  );
};
