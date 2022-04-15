import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <header>

      {/*  Navbar */}

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
            <a className="navbar-brand mt-2 mt-lg-0" href="/#">
              <img
                src="//rmkcdn.successfactors.com/d6383ce6/92e3b586-57c7-4f17-8570-9.png"
                alt="Metlife Logo"
              />
            </a>
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  HOME
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownCarrerLink"
                  data-mdb-toggle="dropdown"
                  href="/#"
                >
                  CARRER AREAS
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  data-mdb-toggle="dropdown"
                >
                  LOCATIONS
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  data-mdb-toggle="dropdown"
                >
                  UNIVERSITY PROGRAMS
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  data-mdb-toggle="dropdown"
                >
                  OUR COMPANY
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      {/* BlueBar */}

      <div className="headerSubMenu d-flex align-items-center">
        <a href="/#" className="lang dropdown-toggle">
          Language
        </a>
        <a href="/#" className="prof">
          View Profile
        </a>
      </div>

      {/* Home Link */}

      <div className="container-fluid home">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/#">Home</a>
              <span> | at MetLife</span>
            </li>
          </ol>
        </nav>
      </div>

      
    </header>
  );
};

export default Navbar;
