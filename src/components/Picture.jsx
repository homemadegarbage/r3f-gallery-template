import { useTexture, Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import { useModal } from './ModalContext';

export default function Picture({ data, onClick }) {
  const texture = useTexture(data.image);

  const group = useRef();
  const { camera } = useThree();

  const [near, setNear] = useState(false);

  const { activeItem } = useModal();
  const modalOpen = !!activeItem;

  const aspect = useMemo(() => {
    if (!texture.image) return 1;
    return texture.image.width / texture.image.height;
  }, [texture]);

  const baseHeight = 2;

  const width = baseHeight * aspect;
  const height = baseHeight;

  useFrame(() => {
    if (!group.current) return;

    const d = group.current.position.distanceTo(camera.position);
    setNear(d < 10);
  });

  return (
    <group ref={group} position={data.position}>
      {/* Picture */}
      <mesh onClick={near ? onClick : null}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* UI */}
      {near && !modalOpen && (
        <Html position={[0, height / 2 + 0.4, 0]} transform center scale={0.5}>
          <div className="bg-black/60 text-white text-xs p-2 rounded-sm">{data.title}</div>
        </Html>
      )}
    </group>
  );
}
