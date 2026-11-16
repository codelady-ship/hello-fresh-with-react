import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { asset, topics } from '../../../data/site';

const links = [
  { id: 0, href: '/OurPlans', title: 'Our Plans' },
  { id: 1, href: '/OurMenu', title: 'Our Menu' },
  { id: 2, href: '/GiftCards', title: 'Gift Cards' },
  { id: 3, href: '/ThanksgivingBoxs', title: 'Thanksgiving Box' },
];

const linkClass = ({ isActive }) =>
  `block py-2 font-semibold transition duration-200 hover:text-green-600 lg:py-0 ${isActive ? 'text-green-600' : 'text-gray-700'}`;

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const dropdownRef = useRef(null);

  // Close menus after navigating to another page
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Close the dropdown on outside click or Escape
  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
        <Link to="/" aria-label="HelloFresh clone home">
          <img src={asset('images/logo.png')} alt="HelloFresh logo" width="93" height="30" className="w-28" />
        </Link>

        <button
          type="button"
          className="rounded p-2 text-2xl leading-none text-gray-700 lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav
          id="main-nav"
          aria-label="Main"
          className={`${menuOpen ? 'block' : 'hidden'} absolute left-0 right-0 top-full border-t bg-white px-5 pb-5 shadow-md lg:static lg:flex lg:items-center lg:gap-8 lg:border-0 lg:p-0 lg:shadow-none`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
            {links.map(({ id, href, title }) => (
              <li key={id}>
                <NavLink to={href} className={linkClass}>{title}</NavLink>
              </li>
            ))}
            <li className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="flex items-center gap-1 py-2 font-semibold text-gray-700 transition duration-200 hover:text-green-600 lg:py-0"
                aria-expanded={dropdownOpen}
                aria-controls="sustainability-menu"
                onClick={() => setDropdownOpen((o) => !o)}
              >
                Sustainability <span aria-hidden="true">{dropdownOpen ? '▴' : '▾'}</span>
              </button>
              {dropdownOpen && (
                <ul id="sustainability-menu" className="pl-4 lg:absolute lg:right-0 lg:top-9 lg:w-60 lg:rounded lg:bg-white lg:p-2 lg:shadow-lg">
                  {topics.map((t) => (
                    <li key={t.path}>
                      <NavLink to={t.path} className={({ isActive }) => `block rounded px-2 py-1.5 hover:bg-green-50 hover:text-green-700 ${isActive ? 'text-green-600' : 'text-gray-700'}`}>
                        {t.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
          <Link
            to="/OurPlans"
            className="mt-3 inline-block rounded border-2 border-green-600 px-4 py-1.5 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white lg:mt-0"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
