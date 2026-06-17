import type { ReactNode } from "react";
import IconButton from "../components/ui/IconButton";

type AppShellProps = {
  children: ReactNode;
  caseFileDate: string;
};

function AppShell({ children, caseFileDate }: AppShellProps) {
  return (
    <div className="min-h-screen px-4 py-3 text-noir-ink sm:px-6 sm:py-4">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-4xl flex-col sm:min-h-[calc(100vh-3rem)]">
        <header className="flex items-center justify-between border-b border-noir-rule pb-2">
          <div>
            <p className="text-xs font-bold uppercase text-noir-soft">
              Daily Dispatch
            </p>
            <h1 className="font-noir-display text-2xl uppercase sm:text-3xl">
              Wordle Noir
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <IconButton label="Open instructions">?</IconButton>
            <IconButton label="Sound muted">♪</IconButton>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center gap-3 py-3 sm:gap-4">
          <section className="w-full border-y border-noir-rule py-2 text-center">
            <p className="text-sm font-bold uppercase text-noir-soft">
              Case File
            </p>
            <h2 className="font-noir-display text-3xl uppercase sm:text-[2rem]">
              №{caseFileDate}
            </h2>
          </section>
          {children}
        </main>

        <footer className="border-t border-noir-rule pt-2 text-center text-xs uppercase text-noir-soft">
          Six guesses. One city. No alibis.
        </footer>
      </div>
    </div>
  );
}

export default AppShell;
