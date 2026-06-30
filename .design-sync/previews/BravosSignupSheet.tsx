import * as React from 'react';
import { BravosSignupSheet } from '@clube-bravos/design-system';

// Owned preview: BravosSignupSheet renders only position:fixed elements, so the
// default card collapses to 0 height and the capture comes out blank. Wrapping it
// in a sized container with `transform` establishes a containing block for the
// fixed backdrop/aside so the card paints. The shipped component is unchanged.
function Frame({ plan }: { plan: string | null }) {
  return (
    <div style={{ position: 'relative', height: 760, transform: 'translateZ(0)', overflow: 'hidden' }}>
      <BravosSignupSheet open plan={plan} onClose={() => {}} />
    </div>
  );
}

export const Default = () => <Frame plan={null} />;
export const ComPlano = () => <Frame plan="completo" />;
