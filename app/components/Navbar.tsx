"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { RiBook2Line } from "react-icons/ri";
import { RxDividerVertical, RxSwitch } from "react-icons/rx";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

interface NavbarProps {
  font: string;
  darkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ font, darkMode }) => {
  const [selectedFont, setSelectedFont] = useState(font);
  const [isDarkMode, setIsDarkMode] = useState(darkMode);

  useEffect(() => {
    document.documentElement.classList.remove('font-serif', 'font-sans-serif', 'font-mono');
    document.documentElement.classList.add(`font-${selectedFont}`);
  }, [selectedFont]);

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFont(e.target.value);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="w-full flex justify-between items-center py-4">
      <Link href="/">
        <RiBook2Line className='text-2xl md:text-3xl lg:text-4xl text-gray-400'/>
      </Link>
      <div className="flex items-center">
        <select
          value={selectedFont}
          onChange={handleFontChange}
          className="dark:bg-gray-800 bg-gray-100 p-2 text-sm rounded-lg font-bold focus:outline-none focus:ring focus:ring-violet-500"
        >
            <option value="serif">Serif</option>
            <option value="sans-serif">Sans Serif</option>
            <option value="mono">Monospace</option>
        </select>
        <RxDividerVertical className='text-2xl md:text-3xl lg:text-4xl text-slate-200'/>
        <button
          className="bg-white dark:bg-slate-800 p-2 text-sm rounded-lg hover:scale-105"
          onClick={handleDarkModeToggle}
        >
          {isDarkMode ? 
          <div className='flex items-center space-x-4'>
            <RxSwitch className='text-lg lg:text-xl text-gray-400'/>
            <FaRegSun className='text-lg lg:text-xl text-gray-400'/>
          </div>
          : 
          <div className='flex items-center space-x-4'>
            <RxSwitch className='text-lg lg:text-xl rotate-180 text-gray-400'/>
            <FaRegMoon className='text-lg lg:text-xl text-gray-400'/>
          </div>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;