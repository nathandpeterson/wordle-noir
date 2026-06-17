import type { ButtonHTMLAttributes } from "react";

type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label" | "title" | "type"
> & {
  label: string;
};

function IconButton({ children, label, className = "", ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      title={label}
      className={`inline-flex size-10 items-center justify-center rounded border border-noir-rule/80 bg-noir-paper/70 text-lg font-bold leading-none text-noir-ink shadow-[0_2px_0_var(--color-rule)] transition duration-150 hover:-translate-y-0.5 hover:bg-noir-aged active:translate-y-0 active:shadow-[0_1px_0_var(--color-rule)] ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
