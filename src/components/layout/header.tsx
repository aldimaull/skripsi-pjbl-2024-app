import { List } from "@phosphor-icons/react/dist/ssr/List";

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-3xl tracking-tight">
        <span className="font-black">Project</span>ic
      </h1>
      <List size={32} weight="duotone" />
    </header>
  );
}
