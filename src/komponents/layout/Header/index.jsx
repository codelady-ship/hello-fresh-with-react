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
  `flex min-h-11 items-center font-semibold transition duration-200 hover:text-green-600 ${isActive ? 'text-green-600' : 'text-gray-700'}`;

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const dropdownRef = useRef(null);
  const dropdownBtnRef = useRef(null);
  const toggleRef = useRef(null);
  const navRef = useRef(null);
  const wasOpen = useRef(false);

  // The toggle is only visible below the lg breakpoint; on desktop the nav is always shown.
  const isMobileMenu = () => !!toggleRef.current && toggleRef.current.offsetParent !== null;

  // Close menus after navigating to another page
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Mobile menu: move focus into it on open, give it back to the toggle on close.
  useEffect(() => {
    if (menuOpen) {
      navRef.current?.querySelector('a,button')?.focus();
    } else if (wasOpen.current && navRef.current?.contains(document.activeElement)) {
      toggleRef.current?.focus();
    }
    wasOpen.current = menuOpen;
  }, [menuOpen]);

  // Close the dropdown on outside click; Escape closes menus; Tab is kept inside the open mobile menu.
  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (dropdownRef.current?.contains(document.activeElement)) dropdownBtnRef.current?.focus();
        setDropdownOpen(false);
        if (isMobileMenu()) {
          setMenuOpen((open) => {
            if (open) toggleRef.current?.focus();
            return false;
          });
        }
        return;
      }
      if (e.key !== 'Tab' || !isMobileMenu() || toggleRef.current.getAttribute('aria-expanded') !== 'true') return;
      const items = [toggleRef.current, ...navRef.current.querySelectorAll('a[href],button')].filter((el) => el.offsetParent !== null);
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!items.includes(document.activeElement)) {
        e.preventDefault();
        first.focus();
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3 sm:px-8">
        <Link to="/" aria-label="HelloFresh clone home" className="flex min-h-11 items-center">
          <img src={asset('images/logo.png')} alt="HelloFresh logo" width="93" height="30" className="w-28" />
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded text-2xl leading-none text-gray-700 lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>

        <nav
          ref={navRef}
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
                ref={dropdownBtnRef}
                type="button"
                className="flex min-h-11 items-center gap-1 font-semibold text-gray-700 transition duration-200 hover:text-green-600"
                aria-expanded={dropdownOpen}
                aria-controls="sustainability-menu"
                onClick={() => setDropdownOpen((o) => !o)}
              >
                Sustainability <span aria-hidden="true">{dropdownOpen ? '▴' : '▾'}</span>
              </button>
              {dropdownOpen && (
                <ul id="sustainability-menu" className="pl-4 lg:absolute lg:right-0 lg:top-11 lg:w-60 lg:rounded lg:bg-white lg:p-2 lg:shadow-lg">
                  {topics.map((t) => (
                    <li key={t.path}>
                      <NavLink to={t.path} className={({ isActive }) => `flex min-h-11 items-center rounded px-2 py-1.5 hover:bg-green-50 hover:text-green-700 ${isActive ? 'text-green-600' : 'text-gray-700'}`}>
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
            className="mt-3 inline-flex min-h-11 items-center rounded border-2 border-green-600 px-4 py-1.5 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white lg:mt-0"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
