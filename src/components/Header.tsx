
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="glass fixed top-0 w-full z-50 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">TuneHunter</Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
