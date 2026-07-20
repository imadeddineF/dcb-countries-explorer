import { Link } from "@/i18n/navigation";
import { LangDropdown } from "../shared/lang-dropdown";
import { ModeToggle } from "../shared/mode-toggle";

export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          <span aria-hidden>🌍</span>
          <span>Countries Explorer</span>
        </Link>

        <div className="flex items-center gap-2">
          <LangDropdown />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
