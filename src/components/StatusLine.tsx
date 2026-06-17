const toneClasses = {
  neutral: "text-noir-soft",
  success: "text-noir-correct",
  warning: "text-noir-present",
  muted: "text-noir-absent",
} as const;

type StatusTone = keyof typeof toneClasses;

type StatusLineProps = {
  children?: string;
  tone?: StatusTone;
};

function StatusLine({ children = "Awaiting a lead.", tone = "neutral" }: StatusLineProps) {
  return (
    <p className={`min-h-7 text-center text-sm font-bold uppercase sm:text-base ${toneClasses[tone]}`}>
      {children}
    </p>
  );
}

export default StatusLine;
