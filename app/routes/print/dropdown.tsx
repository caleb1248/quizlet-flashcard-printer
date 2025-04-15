import { clsx } from 'clsx';
import { Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface DropdownOption<T> {
  label: string;
  value: T;
}

export interface DropdownProps<T> {
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  /**
   * The index of the initial selected option.
   */
  initial: number;
  className?: string;
}

export function Dropdown<T>(props: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(props.options[props.initial]);

  useEffect(() => {
    props.onChange(selected.value);
  }, [selected]);
  return (
    <button
      className={clsx(
        'border-border relative flex rounded-md border text-left',
        props.className,
      )}
      onClick={() => setOpen(!open)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      tabIndex={0}
    >
      <p className="flex h-full w-full justify-between px-4 py-2 select-none">
        <span>{selected.label}</span>
        <span>
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2}
            strokeLinejoin="round"
          >
            <path
              d="m6 9 6 6 6-6"
              className={`animated-chevron ${open ? 'up' : ''}`}
            ></path>
          </svg>
        </span>
      </p>
      <div
        className={`${open ? 'animate-dropdown-expand flex max-h-60' : 'hidden'} border-border bg-background vertical-scroll absolute top-full right-0 left-0 mt-1 flex-col rounded-md border py-2 shadow-lg transition-all`}
      >
        {props.options.map((option) => (
          <button
            className="hover:bg-muted focus:bg-muted w-full bg-inherit px-4 py-2 text-left focus:outline-none"
            onClick={() => setSelected(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </button>
  );
}
