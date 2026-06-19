import { useInView as useIntersectionObserver } from 'react-intersection-observer';

export function useInView(threshold = 0.15) {
  const { ref, inView } = useIntersectionObserver({
    threshold,
    triggerOnce: true,
  });
  return { ref, inView };
}