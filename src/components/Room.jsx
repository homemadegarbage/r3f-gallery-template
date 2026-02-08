import { useTexture } from '@react-three/drei';

export default function Room() {
  const wall = useTexture('/wall.jpg');
  const floor = useTexture('/floor.jpg');

  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial map={floor} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial map={wall} />
      </mesh>

      {/* Front wall (near side) */}
      <mesh position={[0, 5, -10]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial map={wall} />
      </mesh>

      {/* Back wall (far side) */}
      <mesh rotation={[0, Math.PI, 0]} position={[0, 5, 10]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial map={wall} />
      </mesh>

      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-10, 5, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial map={wall} />
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[10, 5, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial map={wall} />
      </mesh>
    </>
  );
}
