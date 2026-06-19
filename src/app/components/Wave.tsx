interface WaveProps {
  /** Fill color for the wave (any CSS color). Defaults to brand cyan. */
  color?: string;
}

/** Standalone downward wave divider — place between two solid sections. */
export function WaveDown({ color = 'rgb(0,164,213)' }: WaveProps) {
  return (
    <div className="leading-[0]">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-20" style={{ fill: color }}>
        <path d="M0,0 L1200,0 L1200,120 Q900,60 600,90 T0,120 Z" />
      </svg>
    </div>
  );
}

/** Standalone upward wave divider — place between two solid sections. */
export function WaveUp({ color = 'rgb(0,164,213)' }: WaveProps) {
  return (
    <div className="leading-[0]">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-20" style={{ fill: color }}>
        <path d="M0,0 Q300,120 600,60 T1200,0 L1200,120 L0,120 Z" />
      </svg>
    </div>
  );
}
