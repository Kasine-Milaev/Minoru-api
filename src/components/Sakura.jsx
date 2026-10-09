import { useMemo } from 'react';

export default function Sakura({ count = 18 }) {
  const petals = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 10,
      delay: -Math.random() * 15,
      size: 8 + Math.random() * 10,
    })),
    [count]
  );
  return petals.map((p) => (
    <span key={p.id} className="petal"
      style={{ left: `${p.left}%`, width: p.size, height: p.size,
               animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }} />
  ));
}