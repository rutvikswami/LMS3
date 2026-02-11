import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-blue-600 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">BlueLearn</h2>
          <p className="text-sm text-blue-100">
            Empowering learners and creators through structured online
            education.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-blue-100 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/my-learning" className="hover:underline">
                My Learning
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Info */}
        <div>
          <h3 className="font-semibold mb-3">About</h3>
          <p className="text-sm text-blue-100">
            Built as a modern LMS platform using React, Django, and MySQL.
          </p>
        </div>
      </div>

      <div className="border-t border-blue-500 text-center py-4 text-sm text-blue-100">
        © {new Date().getFullYear()} BlueLearn. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
