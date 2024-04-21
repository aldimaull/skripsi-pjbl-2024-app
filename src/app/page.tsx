import { List } from "@phosphor-icons/react/dist/ssr/List";

export default function Home() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl tracking-tight">
          <span className="font-black">Project</span>ic
        </h1>
        <List color="#8f0000" size={32} weight="duotone" />
      </header>
      <main>
        <h2 className="text-xl font-bold">Login</h2>
      </main>
      <footer>Footer</footer>
    </>
  );
}
