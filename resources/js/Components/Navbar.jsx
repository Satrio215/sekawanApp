import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = ({ auth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4 sticky top-0 z-50 shadow-md backdrop-blur-md transition-all duration-300 bg-black">
      <div className="flex justify-between items-center px-8">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <a href="#">
            <img src="/asset/pojok.png" alt="Logo" className="h-12 w-auto" />
          </a>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`lg:flex lg:items-center lg:space-x-8 text-white lg:static absolute top-16 left-0 w-full lg:w-auto bg-black lg:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          {auth.user ? (
            <li className="lg:inline-block block text-center py-2">
              <Link
                href={route('dashboard')}
                className="hover:text-gray-400"
              >
                Dashboard
              </Link>
            </li>
          ) : (
            <>
              <li className="lg:inline-block block text-center py-2">
                <Link
                  href={route('login')}
                  className="hover:text-gray-400"
                >
                  Log in Admin
                </Link>
              </li>
              <li className="lg:inline-block block text-center py-2">
                <Link
                  href={route('register')}
                  className="hover:text-gray-400"
                >
                  Register Admin
                </Link>
              </li>
              <li className="lg:inline-block block text-center py-2">
                <Link
                  href={route('penyetuju.login')}
                  className="hover:text-gray-400"
                >
                  Log in Penyetuju
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
