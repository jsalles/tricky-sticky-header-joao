import { useEffect, useState } from 'react';

export function useScrollDirection() {

  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null
  );

  useEffect(() => {
    let previousPosition = window.scrollY;
    const onScroll = () => {
      const currentPosition = window.scrollY;

      if (currentPosition < 60) {
        setScrollDirection(null);
      } else if (currentPosition > previousPosition) {
        setScrollDirection('down');
      } else if (currentPosition < previousPosition) {
        setScrollDirection('up');
      } 
      // probably won't be called if currentPosition === previousPosition
      // so I'll just keep the previous state if that ever happens

      previousPosition = currentPosition;
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return scrollDirection;
}
