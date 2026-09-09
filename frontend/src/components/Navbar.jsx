import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-4 md:px-8 py-4 md:py-6 z-50">
      <Link to="/" className="text-base md:text-lg tracking-widest font-display">
        ICARUS
      </Link>
      <div className="flex gap-4 md:gap-8 text-xs md:text-sm tracking-widest">
        <Link to="/" className="hover:text-icarus-accent transition-colors">
          ICARUS
        </Link>
        <Link to="/about" className="hover:text-icarus-accent transition-colors">
          ABOUT
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;