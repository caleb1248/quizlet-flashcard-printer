import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import quizletPreexportDark from './quizlet-preexport-dark.png';
import quizletPreexportLight from './quizlet-preexport-light.png';
import { useRef, useState, type Ref, type RefObject } from 'react';

interface Card {
  front: string;
  back: string;
}

export function PrePrint(props: { data: RefObject<Card[]>; onComplete: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <HowToExport ref={dialogRef} />
      <h2 className="text-3xl font-bold">Print your quizlet set</h2>
      <br />

      <p className="py-5 text-lg">
        Export your set and paste it below.{' '}
        <button
          className="font-semibold underline cursor-pointer focus:outline-none"
          onClick={() => dialogRef.current?.showModal()}
        >
          How to export your deck
        </button>
      </p>
      <textarea
        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-0 resize-none"
        placeholder="Your set data..."
      ></textarea>
      <div className="flex flex-row-reverse pt-5">
        <button className="button primary group">
          Next{' '}
          <ArrowRight className="ml-2 inline-block transition-transform ease-out group-active:translate-x-1" />
        </button>
      </div>
    </>
  );
}

export function HowToExport({ ref }: { ref: Ref<HTMLDialogElement> }) {
  return (
    <dialog
      ref={ref}
      className="w-11/12 rounded-xl m-auto p-5 max-w-2xl backdrop:backdrop-opacity-10 backdrop:backdrop-brightness-105 outline-none bg-gray-100 dark:bg-gray-900 text-foreground"
    >
      <div>
        <h2 className="text-3xl font-bold">How to export your quizlet set</h2>
        <br />
        <ol className="pl-5 list-decimal ml-5">
          <li>Go to your quizlet set. Click the 3 dots and click "Export".</li>
          <li>Next, click "Copy text".</li>
        </ol>
        <br />
        <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4">
          <p className="text-center font-bold">Demo</p>
          <br />
          <div className="grid grid-rows-2 gap-2 md:grid-cols-2 md:grid-rows-1">
            <div>
              <img src={quizletPreexportDark} className="hidden dark:block w-full rounded" />
              <img src={quizletPreexportLight} className="block dark:hidden w-full rounded" />
            </div>
            <div></div>
          </div>
        </div>
        <br />
        <button className="float-right button primary">Close</button>
      </div>
    </dialog>
  );
}

export default function Print() {
  const cards = useRef<Card[]>([]);
  const [state, setState] = useState<'preprint' | 'print'>('preprint');
  return (
    <div className="w-full flex justify-center p-5">
      <div className="p-6  container border border-gray-500 rounded-lg w-full max-w-3xl">
        {state === 'preprint' ? <PrePrint data={cards} /> : <div>Print</div>}
      </div>
    </div>
  );
}
