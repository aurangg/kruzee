import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Sticky from 'react-stickynode';

import { withRouter } from 'react-router-dom';

import { getUserLogin, setAccountCreatedMsg } from './localStorage';
import logo from './assets/image/logo.svg';

const studentPortalNavbar = (props) => {
	var { mClass, nClass, cClass, slogo, hbtnClass } = props;
	const userLogin = getUserLogin();

	const handleLoginClick = (e) => {
		setAccountCreatedMsg('false');
	};

	const logout = () => {
		localStorage.clear();
		props.history.push('/');
	};
	return (
		<Sticky top={0} innerZ={9999} activeClass="navbar_fixed">
			<header className="header_area" style={{ marginBottom: '5px' }}>
				<nav
					className={`navbar navbar-expand-lg menu_one ${mClass}`}
					style={{ display: 'flex', alignItems: 'center', height: '60px', marginBottom: '15px' }}
				>
					<div className={`container ${cClass} d-flex justify-content-between`}>
						<Link className={`navbar-brand ${slogo} pl-lg-5 `} to="https://www.kruzee.com">
							<img src={require('./assets/image/movo-white.png')} width="130" alt="logo" />
							<img src={logo} height="41" width="125" alt="logo" />
						</Link>

						<div style={{ flex: 'none', marginRight: '10px' }}>
							{userLogin ? (
								<Link
									to="https://www.kruzee.com"
									onClick={logout}
									style={{
										backgroundColor: '#37A2d0',
										color: 'white',
										// lineHeight: '1.9 !important',
										lineHeight: 1.9,
										minWidth: '95px',
										marginLeft: '0px',
									}}
									className={`btn_get btn_hover ml-0 ${hbtnClass} w-50`}
								>
									Logout
								</Link>
							) : (
								<Link
									to="/SignIn"
									onClick={handleLoginClick}
									style={{ backgroundColor: '#37A2d0', color: 'white' }}
									className={`btn_get btn_hover ${hbtnClass}`}
								>
									Login
								</Link>
							)}
						</div>
					</div>
				</nav>
			</header>
		</Sticky>
	);
};

export default studentPortalNavbar;
