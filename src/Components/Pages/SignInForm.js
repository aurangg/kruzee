import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Common/constants';

import { setUserLogin, getAccountCreatedMsg } from '../Common/localStorage';

import { useNavigate, withRouter } from 'react-router-dom';
import thanksIcon from '../Common/assets/image/thanksMsgIcon.png';

const SignInFrom = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);
	const navigate = useNavigate();

	const loginMsg = getAccountCreatedMsg();
	let message;

	const submitForm = async (e) => {
		e.preventDefault();
		setLoading(true);
		localStorage.clear();
		try {
			const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/student/login`, {
				email: email,
				password: password,
			});
			setUserLogin(data.data);
			message = 'Successfully signed in';
			// console.log('data', data);
			if (data.status === 200) {
				navigate('/studentPortal');
			}

			// history.push('/studentPortal');
			setLoading(false);
		} catch (error) {
			message = 'Error signing in';
			setErrorMsg(true);
			setLoading(false);
		}
	};

	return (
		<section className="sign_in_area sec_pad2">
			{loginMsg === 'true' ? (
				<div
					className="row justify-content-center py-4"
					style={{
						backgroundColor: '#37A2D0',
					}}
				>
					<div className="col-7">
						<div className="row">
							<img src={thanksIcon} />
							<div className="col" style={{ alignSelf: 'center' }}>
								<h2 className="m-0" style={{ color: 'white', fontWeight: '800' }}>
									Thank you for your purchase!
								</h2>
								<h2 className="m-0" style={{ color: 'white' }}>
									We hope you enjoy your lessons with us 🎉
								</h2>
							</div>
						</div>
					</div>
				</div>
			) : (
				''
			)}

			<div className="container" style={{ minHeight: '100vh' }}>
				<div className="row justify-content-center mt-4">
					<div className="col-lg-6">
						<div className="pricing-box">
							<div className="login_info px-4">
								<h2 className="f_p f_600 f_size_28 t_color3 mb_40 f-size-20">
									Log-in: Manage In-Car Lessons
								</h2>
								<span>{message}</span>
								<form onSubmit={submitForm} className="login-form sign-in-form">
									<div className="email-container">
										<h6 className="email-heading color-gray900">Email</h6>
										<input
											className="email-input"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											type="email"
											placeholder="Email"
										/>
									</div>
									<div className="email-container">
										<h6 className="email-heading color-gray900">Password</h6>
										<input
											className="email-input"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											type="password"
											placeholder="Password"
										/>
									</div>
									<div className="d-flex justify-content-end ">
										<a href="/reset-password" style={{ color: '#37a2d0' }}>
											Forgot Password
										</a>
									</div>
									{errorMsg && (
										<div
											style={{
												color: 'red',
											}}
										>
											{'* Invalid email or password'}
										</div>
									)}
									<div className="extra"></div>

									<div className="d-flex justify-content-between align-items-center">
										<button type="submit" className="create-account-btn" style={{ width: '100%' }}>
											{loading ? 'Signing In' : 'Sign in'}
										</button>
										<div className="social_text d-flex "></div>
									</div>
									<div
										className="my-2"
										style={{
											width: '100%',
											textAlign: 'center',
										}}
									>
										{loading && (
											<div className="spinner-border mx-3" role="status">
												<span className="sr-only">Loading</span>
											</div>
										)}
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default SignInFrom;
