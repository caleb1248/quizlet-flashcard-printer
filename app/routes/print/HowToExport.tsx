import { useImperativeHandle, useRef, type Ref } from 'react';
import { X } from 'lucide-react';
import quizletPreexportDark from './quizlet-preexport-dark.png';
import quizletPreexportLight from './quizlet-preexport-light.png';

export default function HowToExport({
  ref,
}: {
  ref: Ref<HTMLDialogElement | null>;
}) {
  const localRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => localRef.current!, [localRef.current]);

  return (
    <dialog
      ref={localRef}
      className="text-foreground open:animate-fadein m-auto w-11/12 max-w-2xl rounded-xl bg-gray-100 outline-none backdrop:backdrop-blur-sm dark:bg-gray-900"
      onClick={(e) => {
        if (e.currentTarget === e.target) e.currentTarget.close();
      }}
    >
      <div className="h-full w-full p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">How to export your quizlet set</h2>
          <button
            className="icon-button"
            onClick={() => localRef.current?.close()}
          >
            <X />
          </button>
        </div>
        <br />
        <ol className="ml-5 list-decimal pl-5">
          <li>Go to your quizlet set. Click the 3 dots and click "Export".</li>
          <li>Next, click "Copy text".</li>
        </ol>
        <br />
        <div className="mt-4 bg-gray-100 p-4 dark:bg-gray-800">
          <p className="text-center font-bold">Demo</p>
          <br />
          <div className="grid grid-rows-2 gap-2 md:grid-cols-2 md:grid-rows-1">
            <div>
              <img
                src={quizletPreexportDark}
                className="hidden w-full rounded dark:block"
              />
              <img
                src={quizletPreexportLight}
                className="block w-full rounded dark:hidden"
              />
            </div>
            <div></div>
          </div>
        </div>
        <br />
        <div className="flex flex-row-reverse">
          <button
            className="button primary"
            onClick={() => localRef.current?.close()}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
