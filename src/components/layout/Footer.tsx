import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <hr className="mt-5" />
      <div className="grid grid-cols-3 my-5">
        <Link href="/">
          <p className="md:text-3xl sm:text-2xl text-xl font-black font-serif tracking-wide">
            
            <span className="text-primary">Project</span>ful
          </p>
        </Link>
      </div>
      <div className="text-center">
        <p className="font-serif">Created by Aldi Maulana</p>
        <p className="text-sm">© 2024</p>
      </div>
    </footer>
  );
}
