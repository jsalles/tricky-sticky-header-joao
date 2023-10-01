'use client';

import { useMemo } from "react";
import { useScrollDirection } from "../hooks/useScrollDirection";

export function Header() {
  const scrollDirection = useScrollDirection();
  const offset = useMemo(() => {
    return scrollDirection === 'down' ? "-translate-y-16": "";
  }, [scrollDirection]);
  return (
    <div
      className={`sticky top-0 ${offset} bg-black transition-all duration-500`}
    >
      <div className="p-5 font-bold text-white">Disappearing Header {scrollDirection}</div>
    </div>
  );
}
