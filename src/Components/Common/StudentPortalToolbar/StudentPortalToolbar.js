import React from 'react';
import Toggle from './StudentPortalToggle';
import {Link} from 'react-router-dom'


const StudentPortalToolbar = props => (
    <header className="toolbar">
        <nav className="toolbar-navigation">
            <Link to="/">
                <div className="toolbar-logo">
                    <img src={process.env.PUBLIC_URL + '/images/kruzee-logo.png'} alt="menu-icon" />
                </div>
            </Link>
            <div className="spacer"></div>
            <Toggle click={props.drawerClickHandler} />
            {/* <div className="toolbar-navigation-items">
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/portfolio">
                            Portfolio
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/careers">
                            Careers
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div> */}
        </nav>
    </header>
)

export default StudentPortalToolbar;