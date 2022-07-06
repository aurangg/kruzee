import React, { useState } from 'react';
import StudentPortalSideDrawer from './StudentPortalSideDrawer';
import StudentPortalToolbar from './StudentPortalToolbar';


function StudentPortalNavMain(){
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
    function drawerToggleClickHandler(){
        setSideDrawerOpen(!sideDrawerOpen)
    }
    function backdropClickHandler(){
        setSideDrawerOpen(!sideDrawerOpen)
    }
    return(
        <React.Fragment>
            <StudentPortalToolbar drawerClickHandler={drawerToggleClickHandler} />
            <StudentPortalSideDrawer show={sideDrawerOpen} drawerClickHandler={drawerToggleClickHandler} />
        </React.Fragment>
    )
}


export default StudentPortalNavMain