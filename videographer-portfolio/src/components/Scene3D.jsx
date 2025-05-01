import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useProgress } from '@react-three/drei';
import CameraModel from './CameraModel';

// Loading component for the 3D scene
function Loader() {
  const { progress } = useProgress();
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-black/80 text-white px-4 py-2 rounded-md">
        {progress.toFixed(0)}% loaded
      </div>
    </div>
  );
}

const Scene3D = () => {
  const scrollY = useRef(0);
  
  // Update scrollY value when page scrolls
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      scrollY.current = window.scrollY;
    });
  }
  
  return (
    <div className="h-[500px] w-full">
      <Canvas shadows>
        <Suspense fallback={<Loader />}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <CameraModel scrollY={scrollY} />
          
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
