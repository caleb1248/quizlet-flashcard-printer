import { useRef, useState } from 'react';
import PrePrint from './PrePrint';
import Print from './Print';
import type { Card } from './utils';

export default function Page() {
  const cards = useRef<Card[]>([]);
  const [state, setState] = useState<'preprint' | 'print'>('preprint');

  return (
    <div className="h-full w-full p-5">
      <style id="page-settings">{`@page {orientation: portrait;margin:0;}`}</style>
      {state === 'preprint' ? (
        <PrePrint data={cards} onComplete={() => setState('print')} />
      ) : (
        <Print data={cards.current} />
      )}
    </div>
  );
}
