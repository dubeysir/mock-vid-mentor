
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-interview-blue flex items-center">
          <span className="text-interview-purple">Mock</span>Vid
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-interview-blue hover:text-interview-purple transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-interview-blue hover:text-interview-purple transition-colors">
            About
          </Link>
          <Link to="/dashboard" className="text-interview-blue hover:text-interview-purple transition-colors">
            Dashboard
          </Link>
          <Button asChild variant="default">
            <Link to="/interview">Start Practice</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X /> : <MenuIcon />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-16 left-0 right-0 z-50 shadow-md animate-fade-in">
          <div className="flex flex-col space-y-4 p-6">
            <Link 
              to="/" 
              className="text-interview-blue hover:text-interview-purple transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-interview-blue hover:text-interview-purple transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link 
              to="/dashboard" 
              className="text-interview-blue hover:text-interview-purple transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Dashboard
            </Link>
            <Button asChild variant="default" onClick={toggleMobileMenu}>
              <Link to="/interview">Start Practice</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
