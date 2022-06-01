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
							<img src={logo} width="200" alt="logo" />
						</Link>

						<div style={{ flex: 'none' }}>
							{userLogin ? (
								<Link
									to="/SignIn"
									onClick={logout}
									style={{ backgroundColor: '#37A2d0', color: 'white' }}
									className={`btn_get btn_hover ${hbtnClass} w-50`}
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

// import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import Sticky from 'react-stickynode';
// import logo from './assets/image/logo.svg';

// import { withRouter } from 'react-router-dom';

// import { getUserLogin, setAccountCreatedMsg } from './localStorage';

// const CustomNavbar = (props) => {
// 	var { mClass, nClass, cClass, slogo, hbtnClass } = props;
// 	const userLogin = getUserLogin();

// 	const handleLoginClick = (e) => {
// 		setAccountCreatedMsg('false');
// 	};

// 	const logout = () => {
// 		localStorage.clear();
// 		props.history.push('/');
// 	};
// 	return (
// 		<Sticky top={0} innerZ={9999} activeClass="navbar_fixed">
// 			<header className="header_area" style={{ marginBottom: '5px' }}>
// 				<nav
// 					className={`navbar navbar-expand-lg menu_one ${mClass}`}
// 					style={{ display: 'flex', alignItems: 'center', height: '60px' }}
// 				>
// 					<div className={`container ${cClass}`}>
// 						<Link className={`navbar-brand ${slogo} pl-lg-5 `} to="/">
// 							<img src={require('./assets/image/movo-white.png')} width="130" alt="logo" />
// 							<img src={logo} width="200" alt="logo" />
// 						</Link>
// 						<button
// 							className="navbar-toggler collapsed"
// 							type="button"
// 							data-toggle="collapse"
// 							data-target="#navbarSupportedContent"
// 							aria-controls="navbarSupportedContent"
// 							aria-expanded="false"
// 							aria-label="Toggle navigation"
// 							style={{ marginTop: '8px' }}
// 						>
// 							<span className="menu_toggle">
// 								<span className="hamburger">
// 									<span></span>
// 									<span></span>
// 									<span></span>
// 								</span>
// 								<span className="hamburger-cross">
// 									<span></span>
// 									<span></span>
// 								</span>
// 							</span>
// 						</button>

// 						<div className="collapse navbar-collapse" id="navbarSupportedContent">
// 							<ul className={`navbar-nav menu ml-auto active ${nClass}`}>
// 								<li className="nav-item">
// 									<NavLink title="Pricing" className="nav-link" to="/">
// 										Home
// 									</NavLink>
// 								</li>
// 								{/* <li className="nav-item">
//                  <NavLink
//                     title="Pricing"
//                     className="nav-link"
//                     to="/How_it_works"
//                   >
//                     How it works
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink
//                     title="Pricing"
//                     className="nav-link"
//                     to="/Earn_with_us"
//                   >
//                     Earn with us
//                   </NavLink>
//                 </li> */}
// 								<li className="nav-item">
// 									<NavLink title="Pricing" className="nav-link" to="/Price">
// 										Pricing
// 									</NavLink>
// 								</li>
// 								<li className="nav-item">
// 									<NavLink title="Pricing" className="nav-link" to="/Contact">
// 										Contact
// 									</NavLink>
// 								</li>
// 								{userLogin && (
// 									<li className="nav-item">
// 										<NavLink title="Profile" className="nav-link" to="/StudentPortal">
// 											Profile
// 										</NavLink>
// 									</li>
// 								)}{' '}
// 							</ul>

// 							{userLogin ? (
// 								<span
// 									onClick={logout}
// 									style={{ backgroundColor: '#37A2d0', color: 'white' }}
// 									className={`btn_get btn_hover ${hbtnClass}`}
// 								>
// 									Logout
// 								</span>
// 							) : (
// 								<Link
// 									to="/SignIn"
// 									onClick={handleLoginClick}
// 									style={{ backgroundColor: '#37A2d0', color: 'white' }}
// 									className={`btn_get btn_hover ${hbtnClass}`}
// 								>
// 									Login
// 								</Link>
// 							)}
// 						</div>
// 					</div>
// 				</nav>
// 			</header>
// 		</Sticky>
// 	);
// };

// export default CustomNavbar;
