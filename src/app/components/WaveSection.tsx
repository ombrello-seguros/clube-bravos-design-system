import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface WaveSectionProps {
  children: ReactNode;
  backgroundColor?: string;
  waveColor?: string;
  wavePosition?: 'top' | 'bottom' | 'both' | 'none';
  waveDirection?: 'up' | 'down';
  className?: string;
}

export function WaveSection({
  children,
  backgroundColor = 'rgb(0, 164, 213)',
  waveColor = 'rgb(0, 164, 213)',
  wavePosition = 'both',
  waveDirection = 'down',
  className
}: WaveSectionProps) {
  const WaveTop = () => (
    <div className="relative">
      <svg
        className={`w-full h-20`}
        style={{ fill: waveColor }}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        {waveDirection === 'down' ? (
          <path d="M0,0 L1200,0 L1200,120 Q900,60 600,90 T0,120 Z"></path>
        ) : (
          <path d="M0,120 L1200,120 L1200,0 Q900,60 600,30 T0,0 Z"></path>
        )}
      </svg>
    </div>
  );

  const WaveBottom = () => (
    <div className="relative">
      <svg
        className={`w-full h-20`}
        style={{ fill: waveColor }}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        {waveDirection === 'down' ? (
          <path d="M0,0 Q300,120 600,60 T1200,0 L1200,120 L0,120 Z"></path>
        ) : (
          <path d="M0,120 Q300,0 600,60 T1200,120 L1200,0 L0,0 Z"></path>
        )}
      </svg>
    </div>
  );

  return (
    <>
      {(wavePosition === 'top' || wavePosition === 'both') && <WaveTop />}
      <div
        className={clsx('py-16', className)}
        style={{ backgroundColor }}
      >
        {children}
      </div>
      {(wavePosition === 'bottom' || wavePosition === 'both') && <WaveBottom />}
    </>
  );
}
