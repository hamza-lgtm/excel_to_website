
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {currentYear} Horizon Assessment. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link to="/methodology" className="text-gray-600 hover:text-assessment-blue-500 text-sm">
              Methodology
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-assessment-blue-500 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-assessment-blue-500 text-sm">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-assessment-blue-500 text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
