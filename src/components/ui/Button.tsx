import type { ButtonHTMLAttributes } from "react";

const variants = {
  typewriter:
    "border-noir-rule bg-noir-aged text-noir-ink shadow-[0_3px_0_var(--color-rule)] hover:-translate-y-0.5 hover:shadow-[0_4px_0_var(--color-rule)] active:translate-y-0 active:shadow-[0_1px_0_var(--color-rule)]",
  ghost:
    "border-noir-rule/70 bg-noir-paper/60 text-noir-ink hover:bg-noir-aged/70 active:bg-noir-deep/55",
} as const;

type ButtonVariant = keyof typeof variants;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

function Button({
  children,
  className = "",
  variant = "typewriter",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-8 items-center justify-center rounded border px-4 py-1 text-sm font-bold uppercase transition duration-150 sm:min-h-9 sm:py-1.5 ${variants[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
