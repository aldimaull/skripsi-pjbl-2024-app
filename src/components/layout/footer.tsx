import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <hr className="mt-5" />
      <div className="grid grid-cols-3 my-5">
        <p className="md:text-3xl sm:text-2xl text-xl tracking-tight col-span-2">
          <span className="font-black">Project</span>ic
        </p>
        <div className="md:text-lg sm:text-md text-sm col-span-1">
          <ul>
            <li>
              <Link href="/coba">Coba</Link>
            </li>
            <li>
              <Link href="/coba">Coba</Link>
            </li>
            <li>
              <Link href="/coba">Coba</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center">
        <p>Created by Aldi Maulana</p>
        <p>© 2024</p>
      </div>
    </footer>
  );
}
