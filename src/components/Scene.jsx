import { useState, useEffect } from 'react';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

import Player from './Player';
import Room from './Room';
import Lights from './Lights';
import Picture from './Picture';
import Modal from './Modal';
import { ModalProvider, useModal } from './ModalContext';

function SceneInner() {
  const { activeItem, setActiveItem } = useModal();
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    fetch('/pictures.json')
      .then((res) => res.json())
      .then((data) => setPictures(data))
      .catch((err) => console.error('Failed to load pictures:', err));
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <Lights />
        <Environment preset="warehouse" />

        <Player />
        <Room />

        {pictures.map((p) => (
          <Picture key={p.id} data={p} onClick={() => setActiveItem(p)} />
        ))}
      </Canvas>

      {/* Controls */}
      <div className="fixed left-4 bottom-4 bg-black/60 text-white px-3 py-2 rounded-lg text-xs leading-relaxed pointer-events-none z-999">
        <div>W / ↑ : Move Forward</div>
        <div>S / ↓ : Move Backward</div>
        <div>A / D : Strafe</div>
        <div>← / → : Turn</div>
        <div>Click : Open Details</div>
      </div>

      {activeItem && <Modal data={activeItem} onClose={() => setActiveItem(null)} />}
    </div>
  );
}

export default function Scene() {
  return (
    <ModalProvider>
      <SceneInner />
    </ModalProvider>
  );
}
