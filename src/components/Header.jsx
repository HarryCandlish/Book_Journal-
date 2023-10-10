import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import '../styles/header.css'
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx'



const Header = () => {


   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   }
;
  return (
    <nav className='navbar'>
      <div className='navbar-container'>
         <Link to='/' className='navbar-logo'>
            <h1>BOOKS</h1>
         </Link>
         <div className="menu-icon" onClick={toggleMenu}>
            {isOpen ? <RxCross1/> : <RxHamburgerMenu/>}
         </div>
          <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
               <Link to='/' className='nav-links' onClick={toggleMenu}>
                  Home
               </Link>
            </li>
            <li className='nav-item'>
               <Link to='/about' className='nav-links' onClick={toggleMenu}>
                  About
               </Link>
            </li>
            <li className='nav-item'>
               <Link to='/registration' className='nav-links' onClick={toggleMenu}>
                  <button className='btn-subscribe'>Subscribe</button>
               </Link>
            </li>
         </ul>
      </div>

    </nav>
  )
}


export default Header