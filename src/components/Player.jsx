import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Player() {
  const { camera } = useThree();

  const velocity = useRef(new THREE.Vector3());
  const keys = useRef({});

  useEffect(() => {
    const down = (e) => (keys.current[e.code] = true);
    const up = (e) => (keys.current[e.code] = false);

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);

    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  useFrame((_, delta) => {
    const speed = 6;
    const rotateSpeed = 1.8;

    velocity.current.set(0, 0, 0);

    // Forward / backward movement (based on camera direction)
    if (keys.current.KeyW || keys.current.ArrowUp) velocity.current.z -= speed;
    if (keys.current.KeyS || keys.current.ArrowDown) velocity.current.z += speed;

    // Strafe (left / right movement)
    if (keys.current.KeyA) velocity.current.x -= speed;
    if (keys.current.KeyD) velocity.current.x += speed;

    // Rotation (left / right arrow keys)
    if (keys.current.ArrowLeft) camera.rotation.y += rotateSpeed * delta;
    if (keys.current.ArrowRight) camera.rotation.y -= rotateSpeed * delta;

    // Keep camera level (lock pitch and roll)
    camera.rotation.x = 0;
    camera.rotation.z = 0;

    // Calculate movement direction from Y rotation only
    const angle = camera.rotation.y;
    const forward = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    const right = new THREE.Vector3(Math.cos(angle), 0, -Math.sin(angle));

    camera.position.addScaledVector(forward, velocity.current.z * delta);
    camera.position.addScaledVector(right, velocity.current.x * delta);

    // Fixed camera height (eye level)
    camera.position.y = 3;

    // Movement boundaries
    const MIN_X = -8;
    const MAX_X = 8;
    const MIN_Z = -9;
    const MAX_Z = 9;

    camera.position.x = THREE.MathUtils.clamp(camera.position.x, MIN_X, MAX_X);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, MIN_Z, MAX_Z);
  });

  return null;
}
