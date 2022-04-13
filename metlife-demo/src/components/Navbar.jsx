import React from 'react';
import './Navbar.css'

const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src="//rmkcdn.successfactors.com/d6383ce6/92e3b586-57c7-4f17-8570-9.png"
                alt="Metlife Logo"
              />
            </a>
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  HOME
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" 
                id="navbarDropdownCarrerLink"
                data-mdb-toggle="dropdown"
               
                href="#">
                  CARRER AREAS
                </a>
              </li> 
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle"  href="#" data-mdb-toggle="dropdown">
                  LOCATIONS
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-mdb-toggle="dropdown">
                  UNIVERSITY PROGRAMS
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-mdb-toggle="dropdown">
                  OUR COMPANY
                </a>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
           
            <div className="dropdown">
              <a
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Some news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    My profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
      </nav>

    <div className='headerSubMenu d-flex align-items-center'>
          <a href='#' className='lang dropdown-toggle'>Language</a>
          <a href='#' className='prof'>View Profile</a>
    </div>



      <div className="container-fluid home">
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Home</a><span> | at MetLife</span>
        </li>
      </ol>
    </nav>
  </div>
    </header>
    
  );
};

export default Navbar;
