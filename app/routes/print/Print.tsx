import { useEffect, useState } from 'react';
import type { Card } from './utils';
import { Dropdown } from './dropdown';

interface PrintOptions {
  fontSize: number;
  rows: number;
  columns: number;
}

function PrintLayoutGenerator({
  data,
  options,
}: {
  data: Card[];
  options: PrintOptions;
}) {
  const cardsPerPage = options.rows * options.columns;
  const pages: React.ReactNode[] = [];

  for (let i = 0; i < data.length; i += cardsPerPage) {
    const currentPageCards = data.slice(i, i + cardsPerPage);

    const frontCards = currentPageCards.map((card, idx) => (
      <div
        key={`front-${i}-${idx}`}
        className="flex items-center justify-center border border-gray-500 p-2 text-center"
      >
        {card.front}
      </div>
    ));

    const backCards = currentPageCards.map((card, idx) => (
      <div
        key={`back-${i}-${idx}`}
        className="flex items-center justify-center border border-gray-500 p-2 text-center"
      >
        {card.back}
      </div>
    ));

    pages.push(
      <div
        key={`front-page-${i}`}
        className="bg-background grid h-screen w-full print:bg-white"
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
        className="bg-background grid h-screen w-full -scale-x-100 *:-scale-x-100 print:bg-white"
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
  const [fontSize, setFontSize] = useState(12);
  const [rows, _setRows] = useState(4);
  const [columns, _setColumns] = useState(4);
  const [orientation, setOrientation] = useState<Orientation>('portrait');

  useEffect(() => {
    const pageSettings = document.getElementById('page-settings');
    if (pageSettings) {
      pageSettings.innerHTML = `@page {size: ${orientation}; margin: 0;}`;
    }
  }, [orientation]);

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
            className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700 dark:accent-blue-600"
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
            }}
          />
        </div>
      </div>
    </div>
  );
}
