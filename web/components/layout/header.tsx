import Link from "next/link";
import { LangDropdown } from "../shared/lang-dropdown";
import { ModeToggle } from "../shared/mode-toggle";

export const AppHeader = () => {
  return (
    <header className="flex items-center justify-between gap-2 p-4 h-16 border-b w-full">
      <div>
        <Link href="/">
          <h1>Logo</h1>
        </Link>
      </div>

      <div>
        <LangDropdown />
        <ModeToggle />
      </div>
    </header>
  );
};
