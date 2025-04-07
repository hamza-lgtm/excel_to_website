
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <Link to="/" className="text-2xl font-bold text-assessment-blue-600">
              Horizon Assessment
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/methodology" className="text-gray-700 hover:text-assessment-blue-500">
              Methodology
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-assessment-blue-500">
              Contact
            </Link>
            <div className="ml-4 flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link to="/register">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              to="/methodology" 
              className="block text-gray-700 hover:text-assessment-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Methodology
            </Link>
            <Link 
              to="/contact" 
              className="block text-gray-700 hover:text-assessment-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" asChild>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
