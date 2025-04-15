import { ArrowRight } from 'lucide-react';
import { useRef, useState, type RefObject } from 'react';
import HowToExport from './HowToExport';
import { parseCards, type Card } from './utils';

export default function PrePrint(props: {
  data: RefObject<Card[]>;
  onComplete: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [err, setErr] = useState(' ');

  return (
    <div className="flex justify-center lg:pt-16">
      <div className="container w-full max-w-3xl rounded-lg border-gray-500 p-6">
        <HowToExport ref={dialogRef} />
        <h2 className="text-3xl font-bold">Import your quizlet set</h2>
        <br />
        <p className="py-5 text-lg">
          Export your set and paste it below.&nbsp;
          <button
            className="cursor-pointer font-semibold underline focus:outline-none"
            onClick={() => dialogRef.current?.showModal()}
          >
            How to export your deck
          </button>
        </p>
        <textarea
          className="w-full resize-none rounded-lg bg-gray-100 p-3 focus:outline-0 dark:bg-gray-800"
          placeholder="Your set data..."
          onInput={(e) => {
            e.currentTarget.style.height = '';
            e.currentTarget.style.height = `${Math.min(e.currentTarget.scrollHeight, 500)}px`;
            const text = (e.target as HTMLTextAreaElement).value;

            if (!text.trim()) {
              setErr(' ');
              return;
            }

            try {
              const cards = parseCards(text);
              props.data.current = cards;
              setErr('');
            } catch (error) {
              setErr((error as Error).message);
            }
          }}
        ></textarea>

        {err && <p className="text-red-500">{err}</p>}
        <div className="flex flex-row-reverse pt-5">
          <button
            className="button primary enabled:group disabled:transition-none"
            disabled={err !== ''}
            onClick={() => props.onComplete()}
          >
            Next{' '}
            <ArrowRight className="ml-2 inline-block transition-transform ease-out group-active:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
