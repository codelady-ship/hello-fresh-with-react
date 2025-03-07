import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuBarsOpen, setMenuBarsOpen] = useState(false);

    const links = [
        { id: 0, href: "/OurPlans", title: 'Our Plans' },
        { id: 1, href: "/OurMenu", title: 'OurMenu' },
        { id: 2, href: "/GiftCards", title: 'Gift Cards' },
        { id: 3, href: "/ThanksgivingBoxs", title: 'Thanksgiving Boxs' },
    ];
    const DropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleMenu = () => {
        setMenuBarsOpen(!menuBarsOpen);
    };

    return (
        <div className="flex flex-row justify-between items-center gap-5 px-8 py-8 relative text-lg font-semibold hover:text-gray-800 transition duration-100">
            {/* Logo */}
            <div className="w-1/3">
            <Link to='Header/index.jsx'>

                    <img src="/images/logo.png" alt="logo" className="w-32 sm:w-30" />
                </Link>
            </div>
            
            {/* Hamburger menu */}
            <button 
                className="block lg:hidden text-xl relative" 
                onClick={toggleMenu}
            >
                {menuBarsOpen ? 'X' : '☰'}
            </button>

            {/* Navigation Links & Login Button */}
            <div className={`flex flex-col bg-green-600 p-3 w-60 h-[310px] sx:absolute top-18 
            lg:flex-row lg:items-center lg:gap-10 ${menuBarsOpen ? 'block' : 'hidden'} lg:block absolute lg:top-7 right-[20%] lg:w-auto lg:h-auto lg:bg-white`}>
                <div className="flex flex-col lg:flex-row lg:gap-5">
                    {links.map(({ id, href, title }) => (
                        <NavLink 
                            key={id} 
                            to={href} 
                            className="text-lg font-semibold sx:text hover:text-white lg:hover:text-green-400 transition duration-300 lg:w-auto"
                        >
                            {title}
                        </NavLink>
                    ))}

                    {/* Dropdown Sustainability */}
                    <div className="relative">
                        <button
                            className="text-lg font-semibold hover:text-white lg:hover:text-green-400 
                             transition duration-300 lg:w-auto"
                            onClick={DropdownToggle}
                        >
                            Sustainability
                        </button>

                        {dropdownOpen && (
                            <div className="absolute top-13 mt-1 text p-2 rounded shadow-lg w-28 bg-green-400
                            lg:absolute lg:top-8">
                                <Link to="/Sustainability/option1" className="block py-1 px-2 hover:text-white font-bold">Option 1</Link>
                                <Link to="/Sustainability/option2" className="block py-1 px-2 hover:text-white font-bold">Option 2</Link>
                                <Link to="/Sustainability/option3" className="block py-1 px-2 hover:text-white font-bold">Option 3</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Login Button */}
            <div className="lg:ml-auto">
                <NavLink
                    to="/login"
                    className="text-lg font-semibold sx:text hover:text-green-400 transition duration-300 border-green-400 py-0.5 px=0.1 lg:inline-block"
                >
                    Login
                </NavLink>
            </div>
        </div>
    );
};

export default Header;
