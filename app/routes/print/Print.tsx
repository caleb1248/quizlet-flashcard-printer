import { useEffect, useRef, useState } from 'react';
import type { Card } from './utils';
import { Dropdown } from './dropdown';
import { Printer } from 'lucide-react';
import clsx from 'clsx';

interface PrintOptions {
  fontSize: number;
  rows: number;
  columns: number;
  showBorders: boolean;
  orientation: Orientation;
}

function PrintLayoutGenerator({
  data,
  options,
}: {
  data: Card[];
  options: PrintOptions;
}) {
  const pageStyle = `grid print:h-screen w-full border ${options.showBorders ? 'border-muted-foreground' : 'border-transparent'} ${options.orientation === 'landscape' ? 'not-print:aspect-3/2' : 'not-print:aspect-2/3'}`;
  const cardStyle = `flex items-center justify-center p-2 text-center border ${options.showBorders ? 'border-muted-foreground' : 'border-transparent'}`;
  const cardsPerPage = options.rows * options.columns;
  const pages: React.ReactNode[] = [];
  for (let i = 0; i < data.length; i += cardsPerPage) {
    const currentPageCards = data.slice(i, i + cardsPerPage);
    if (currentPageCards.length < cardsPerPage) {
      currentPageCards.push(
        ...Array(cardsPerPage - currentPageCards.length).fill({
          front: '',
          back: '',
        }),
      );
    }

    const frontCards = currentPageCards.map((card, idx) => (
      <div key={`front-${i}-${idx}`} className={cardStyle}>
        {card.front}
      </div>
    ));

    const backCards = currentPageCards.map((card, idx) => (
      <div key={`back-${i}-${idx}`} className={cardStyle}>
        {card.back}
      </div>
    ));

    pages.push(
      <div
        key={`front-page-${i}`}
        className={pageStyle}
        style={{
          gridTemplateColumns: `repeat(${options.columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${options.rows}, minmax(0, 1fr))`,
          fontSize: `${options.fontSize}px`,
        }}
      >
        {frontCards}
      </div>,
      <div
        key={`back-page-${i}`}
        className={clsx(pageStyle, '-scale-x-100', '*:-scale-x-100')}
        style={{
          gridTemplateColumns: `repeat(${options.columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${options.rows}, minmax(0, 1fr))`,
          fontSize: `${options.fontSize}px`,
        }}
      >
        {backCards}
      </div>,
    );
  }

  return (
    <div className="w-full not-print:flex not-print:flex-col not-print:gap-6 print:absolute print:top-0 print:left-0 print:overflow-hidden print:bg-white">
      {pages}
    </div>
  );
}

type Orientation = 'portrait' | 'landscape';

export default function Print({ data }: { data: Card[] }) {
  const [fontSize, setFontSize] = useState(20);
  const [rows, _setRows] = useState(4);
  const [columns, _setColumns] = useState(4);
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [showBorders, setShowBorders] = useState(true);
  const initialScrolled = useRef(false);

  if (!initialScrolled.current) {
    initialScrolled.current = true;
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    const pageSettings = document.getElementById('page-settings');
    if (pageSettings) {
      pageSettings.innerHTML = `@page {size: ${orientation};${!showBorders ? ' margin: 0;' : ''}}`;
    }
  }, [orientation, showBorders]);

  const setRows = (val: string) => {
    if (parseInt(val) || val === '') _setRows(parseInt(val));
  };
  const setColumns = (val: string) => {
    if (parseInt(val) || val === '') _setColumns(parseInt(val));
  };

  return (
    <div className="h-full w-full p-6 *:p-6 md:grid md:grid-cols-3 md:pl-0">
      <div>
        <h2 className="text-3xl">Print settings</h2>
        <br />
        <p className="text-lg">Font size</p>
        <p className="flex items-center gap-4">
          <input
            type="range"
            min={5}
            max={30}
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="dark:accent-accent h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
          />
          <span>{fontSize}px</span>
        </p>
        <br />
        <p className="mb-2 text-lg">Paper size (inches)</p>
        <Dropdown<Orientation>
          options={[
            { label: 'Portrait', value: 'portrait' },
            { label: 'Landscape', value: 'landscape' },
          ]}
          initial={0}
          onChange={(val) => setOrientation(val)}
          className="w-full"
        />
        <div className="mt-6">
          <p className="text-lg">Flashcard grid</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="mt-4">
              <p className="mb-2">Rows</p>
              <input
                type="number"
                value={rows}
                onChange={(e) => setRows(e.target.value)}
                onFocus={(e) => e.target.select()}
                className="w-full rounded-lg border border-gray-300 p-2"
              />
            </div>
            <div className="mt-4">
              <p className="mb-2">Columns</p>
              <input
                type="number"
                value={columns}
                onChange={(e) => {
                  setColumns(e.target.value);
                }}
                onFocus={(e) => e.target.select()}
                className="w-full rounded-lg border border-gray-300 p-2"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-4 text-lg">Other options</p>
          <div className="mt-2 flex items-center">
            <label className="inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                value=""
                className="peer sr-only"
                checked={showBorders}
                onChange={(e) => setShowBorders(e.target.checked)}
              />
              <div className="peer peer-checked:bg-accent relative h-6 w-11 rounded-full bg-gray-200 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
              <span className="ms-3 font-medium text-gray-900 dark:text-gray-300">
                Show borders
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-row-reverse">
          <button
            onClick={() => window.print()}
            className="button primary mt-5 flex gap-4"
          >
            Print
          </button>
        </div>
      </div>
      <div className="col-span-2 flex h-full flex-col gap-4">
        <h2 className="text-3xl">Preview</h2>
        <div className="h-full flex-1 overflow-y-auto bg-gray-100 p-8 dark:bg-gray-900">
          <PrintLayoutGenerator
            data={data}
            options={{
              fontSize,
              rows,
              columns,
              showBorders,
              orientation,
            }}
          />
        </div>
      </div>
    </div>
  );
}
