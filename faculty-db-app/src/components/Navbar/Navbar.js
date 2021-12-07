import React, { useState } from 'react'
import * as FaIcons from "react-icons/fa";
import { Link } from 'react-router-dom';
import { NavbarItems } from './NavbarItems';
import './Navbar.css';
import { IconContext } from 'react-icons'

function Navbar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
    const hideSidebar = () => setSidebar(false)
    return (
      <div>
        <IconContext.Provider value={{color: '#fff'}}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onMouseEnter={showSidebar} onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"} >
            <ul className="nav-menu-items" onMouseLeave={hideSidebar}>
              <li className="navbar-icon">
                  
              </li>
              {NavbarItems.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </div>
    );
}

export default Navbar
