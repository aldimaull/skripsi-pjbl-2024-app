import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <hr className="grid grid-cols-3 mt-5" />
      <div className="grid grid-cols-3 my-5">
        <p className="text-3xl tracking-tight">
          <span className="font-black">Project</span>ic
        </p>
        <div>
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
        <div>
          <ul>
            <li>
              <Link href="/coba">Ini</Link>
            </li>
            <li>
              <Link href="/coba">Ini</Link>
            </li>
            <li>
              <Link href="/coba">Ini</Link>
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
