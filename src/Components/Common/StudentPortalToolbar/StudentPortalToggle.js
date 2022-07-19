import React from 'react';


const StudentPortalToggle = props => (
    <button className="toggle-button" onClick={props.click}>
        <img src={process.env.PUBLIC_URL + '/images/menu-bar.svg'} alt="menu-icon" />
    </button>
)

export default StudentPortalToggle;