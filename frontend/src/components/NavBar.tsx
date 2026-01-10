import { ModeToggle } from "./ModeToggle";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b">
      <h1 className="text-xl font-semibold">SiteName</h1>
      <ModeToggle />
    </nav>
  );
}
