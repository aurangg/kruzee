import React from 'react';


const StudentPortalToggle = props => (
    <button className="toggle-button" onClick={props.click}>
        <img src={`${process.env.PUBLIC_URL}/img/icons/menu-hamburger.svg`} alt="menu-icon" />
    </button>
)

export default StudentPortalToggle;