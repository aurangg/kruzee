import React from 'react';
import {Link} from 'react-router-dom';
const StudentPortalSideDrawer = props => {
    let drawerClasses = ['side-drawer']
    if(props.show){
        drawerClasses = ['side-drawer open']
    }
    // console.log(props)
    return(
        <nav className={drawerClasses} onClick={props.drawerClickHandler}>
            <ul>
                <li>
                    <Link to="/" className='active'>
                        My Lessons
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/portfolio">
                        Pricing
                    </Link>
                </li>
                <li>
                    <Link to="/about">
                        Contact
                    </Link>
                </li>
                <li>
                    <Link to="/careers">
                        Blog
                    </Link>
                </li>
                <li>
                    <Link to="/contact">
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default StudentPortalSideDrawer;