import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sticky top-0 bg-slate-950 h-16 text-white">
      <nav className="max-w-300 mx-auto flex h-full items-center justify-between">
        <div>
          <img src="/logo.webp" alt="logo" className="w-17" />
        </div>
        <ul className="flex gap-10">
          <li>
            <Link>Products</Link>
          </li>
          <li>
            <Link>Sign In</Link>
          </li>
          <li>
            <Link>Sign Up</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
