import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from '../../hooks/useInView';

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export default function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const { ref, inView } = useInView();
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp end={numericValue} duration={2} suffix={suffix} decimals={0} />
      ) : (
        '0'
      )}
    </span>
  );
}