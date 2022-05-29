import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Sticky from 'react-stickynode';

import { getUserLogin, setAccountCreatedMsg } from './localStorage';
import logo from '../Common/assets/image/logo.svg';

const CustomNavbar = (props) => {
	var { mClass, nClass, cClass, slogo, hbtnClass } = props;

	return (
		<Sticky top={0} innerZ={9999} activeClass="navbar_fixed">
			<header className="header_area" style={{ marginBottom: '5px' }}>
				<nav
					className={`navbar navbar-expand-lg menu_one ${mClass}`}
					style={{ display: 'flex', alignItems: 'center', height: '60px' }}
				>
					<div className={`container ${cClass} d-flex justify-content-center`}>
						<Link className={`navbar-brand ${slogo} pl-lg-5 `} to="/">
							<img src={require('../Common/assets/image/movo-white.png')} width="130" alt="logo" />
							<img src={logo} width="200" alt="logo" />
						</Link>
					</div>
				</nav>
			</header>
		</Sticky>
	);
};

export default CustomNavbar;
