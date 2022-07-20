import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LargeHeading from '../Common/LargeHeading';
import ProgressBar from '../Common/ProgressBar';
import { isEmail, isStrongPassword } from 'validator';
import Toolbar from '../Common/Toolbar';
import { getWeekStartDate } from '../utils/localStorage';
import TermsOfUse from '../../Terms of Use.pdf';
import PrivacyPolicy from '../../Privacy Policy.pdf';
import { useIntercom } from 'react-use-intercom';
import '../css/onboarding.css';
import '../css/radio-button.css';

function Account() {
	const { boot } = useIntercom();
	boot();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');

	const [fullname, setFullName] = useState('');
	const [phoneError, setPhoneError] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [passPhoneNumber, setPassPhoneNumber] = useState('');

	const [invalid, setInvalid] = useState(false);
	const [valid, setValid] = useState(false);

	const [invalidSecond, setInvalidSecond] = useState(false);
	const [validSecond, setValidSecond] = useState(false);

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [disable, setDisable] = useState(true);
	const [userName, setUserName] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [pickUp, setPickUp] = useState('');
	const [packages, setPackage] = useState('');
	const [day, setDay] = useState('');
	const [slot, setSlot] = useState('');
	const [date, setDate] = useState('');
	const [errorBox, setErrorBox] = useState(false);

	const [weekStartDate, setWeekStartDate] = useState('');

	const [buttonLoading, setButtonLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Create An Account | Kruzee';
		checkPassword();
		if (passPhoneNumber !== '') {
			if (passPhoneNumber.length === 10) {
				setPhoneError(false);
			} else {
				setPhoneError(true);
			}
		}
		checkFinalValidation();
	});

	useEffect(() => {
		localStorage.removeItem('email');
		localStorage.removeItem('password');
		localStorage.removeItem('userName');
		localStorage.removeItem('phoneNumber');
	}, []);
	useEffect(() => {
		if (localStorage.getItem('phoneNumber')) {
			setPhoneNumber(localStorage.getItem('phoneNumber').replace(/"/g, ''));
		}
		if (localStorage.getItem('userName')) {
			console.log(
				'localStorage.getItem(userName).replace(/"/g, )',
				localStorage.getItem('userName').replace(/"/g, '')
			);
			setUserName(localStorage.getItem('userName').replace(/"/g, ''));
		}
		if (localStorage.getItem('postalCode')) {
			setPostalCode(localStorage.getItem('postalCode').replace(/"/g, ''));
		}
		if (localStorage.getItem('pick-up')) {
			setPickUp(localStorage.getItem('pick-up').replace(/"/g, ''));
		}
		if (localStorage.getItem('package')) {
			setPackage(localStorage.getItem('package').replace(/"/g, '').toLowerCase());
		}
		if (localStorage.getItem('day')) {
			setDay(localStorage.getItem('day').replace(/"/g, ''));
		}
		if (localStorage.getItem('slot')) {
			setSlot(localStorage.getItem('slot'));
		}
		if (localStorage.getItem('date')) {
			setDate(localStorage.getItem('date').replace(/"/g, ''));
		}
		if (localStorage.getItem('weekStartDate')) {
			setWeekStartDate(getWeekStartDate().replace(/"/g, ''));
		}
	}, []);

	function handleFullname(e) {
		e.preventDefault();
		setFullName(e.target.value);
		localStorage.setItem('userName', JSON.stringify(e.target.value));
	}

	function handleEmail(e) {
		e.preventDefault();
		setEmail(e.target.value);
		if (isEmail(e.target.value)) {
			setEmailError('');
			localStorage.setItem('email', JSON.stringify(e.target.value));
		} else {
			setEmailError('Invalid Email');
		}
	}

	function handlePhonenumber(e) {
		// e.target.value = e.target.value.split('-').join('').replace(/((?<!\d)\d{3}(?!\b)|(?<=^\d{3})\d{3}(?!\b))/g, '$1-');
		// e.target.value = e.target.value.split('-').join('').replace(/((?<!\d)\d{3}(?!\b)|(?<=^\d{3})\d{3}(?!\b))/g, '$1-');

		let canceL = document.getElementById('phoneNumber').addEventListener('keydown', function (e) {
			if (e.keyCode !== 8) {
				if (e.target.value.length === 3) {
					e.target.value = e.target.value + '-';
				} else if (e.target.value.length === 7) {
					e.target.value = e.target.value + '-';
				}
			}
		});
		setPhoneNumber(e.target.value.replace(/[^\d-]/g, ''));
		const pass = e.target.value.split('-').join('');
		setPassPhoneNumber(pass);
		localStorage.setItem('phoneNumber', JSON.stringify(pass));
	}

	function handlePassword(e) {
		e.preventDefault();
		setPassword(e.target.value);
		if (
			isStrongPassword(e.target.value, {
				minLength: 8,
				minLowercase: 1,
				minSymbols: 1,
				minUppercase: 1,
			})
		) {
			setInvalid(false);
			setValid(true);
			localStorage.setItem('password', JSON.stringify(e.target.value));
		} else {
			setValid(false);
			setInvalid(true);
		}
	}

	function handleConfirmPassword(e) {
		e.preventDefault();
		setConfirmPassword(e.target.value);
		if (
			isStrongPassword(e.target.value, {
				minLength: 8,
				minLowercase: 1,
				minSymbols: 1,
				minUppercase: 1,
			})
		) {
			setInvalidSecond(false);
			setValidSecond(true);
		} else {
			setInvalidSecond(true);
			setValidSecond(false);
		}
	}

	function checkFinalValidation() {
		if (fullname != '' && email != '' && phoneNumber != '' && password === confirmPassword && password != '') {
			setDisable(false);
		} else {
			setDisable(true);
		}
	}

	function checkPassword() {
		if (password != confirmPassword) {
			setInvalidSecond(true);
			setValidSecond(false);
		} else {
			setInvalidSecond(false);
		}
	}

	const formSubmit = async (e) => {
		e.preventDefault();
		setDisable(true);
		setButtonLoading(true);
		const uniqueStudentDataBody = {
			email: email,
			phoneNumber: phoneNumber,
			name: fullname,
			pickUp: pickUp,
			packageName: packages,
			slot: {
				day: day.toLowerCase(),
				slot: slot,
				date: weekStartDate,
			},
			zip: postalCode,
		};
		const uniqueStudentData = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/studentUnique`, {
			method: 'POST',
			body: JSON.stringify({ ...uniqueStudentDataBody }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (uniqueStudentData.status === 200) {
			setDisable(false);
			setButtonLoading(false);
			setErrorBox(false);
			navigate('/payment-information');
		} else {
			setDisable(true);
			setErrorBox(true);
			setButtonLoading(false);
		}
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: 'signup',
			status: uniqueStudentData.status === 200 ? 'success' : 'error', // “failed” if the form return with an error
			user_data: {
				user_id: 'USER ID', // Add the unique User ID here
				phone_number: phoneNumber,
				email_address: email,
				address: {
					postal_code: postalCode,
					fullName: fullname,
					pickUp: pickUp,
					country: 'Canada',
				},
			},
		});
	};

	return (
		<section className="simple-bg h-100vh">
			<div className="container">
				<Toolbar path="/pick-up" back_button="display" />
				<div className="row">
					<ProgressBar
						location={[
							{
								progress: 'complete',
							},
						]}
						packages={[
							{
								progress: 'complete',
							},
						]}
						pickup={[
							{
								progress: 'complete',
							},
						]}
						account={[
							{
								progress: 'current',
							},
						]}
						payment={[
							{
								progress: 'incomplete',
							},
						]}
					/>
					<div className="col-lg-4 offset-lg-4">
						<LargeHeading large_heading="Create an Account" />
						<p className="onboarding-description hide-on-desktop">
							You will be able to manage your lessons, and track your progress
						</p>
					</div>
					{errorBox ? (
						<div className="col-lg-4 offset-lg-4">
							<div className="error-user-box">
								<p className="error-user-text">This user already exists. Please try again.</p>
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
				<div className="row">
					<div className="col-lg-4 offset-lg-4">
						<form onSubmit={formSubmit}>
							<div className="email-container">
								<h6 className="email-heading color-gray900">Full Name</h6>
								<input
									className="email-input"
									type="text"
									onChange={handleFullname}
									value={fullname}
									placeholder="John Doe"
									required
								/>
							</div>
							<div className="email-container">
								<h6 className="email-heading color-gray900">Email Address</h6>
								<input
									className={`email-input ${emailError !== '' ? 'error-border' : ''}`}
									type="email"
									onChange={handleEmail}
									placeholder="name@email.com"
									value={email}
									required
								/>
								<p className="input-info-text error-text-color">{emailError}</p>
							</div>
							<div className="email-container">
								<h6 className="email-heading color-gray900">Phone Number</h6>
								<input
									className={`email-input ${phoneError ? 'error-border' : ''}`}
									type="tel"
									maxLength={12}
									onChange={handlePhonenumber}
									placeholder="000-000-0000"
									value={phoneNumber}
									id="phoneNumber"
									required
								/>
							</div>
							<div className="email-container">
								<h6 className="email-heading color-gray900">Password</h6>
								<div className="email-container">
									<input
										className={`email-input ${invalid ? 'error-border' : ''}`}
										type="password"
										onChange={handlePassword}
										value={password}
										minLength="8"
									/>
									<img
										className={`input-img ${invalid ? '' : 'display-none'}`}
										src={process.env.PUBLIC_URL + '/images/error-img.svg'}
										alt="check"
									/>
									<img
										className={`input-img ${valid ? '' : 'display-none'}`}
										src={process.env.PUBLIC_URL + '/images/check.svg'}
										alt="check"
									/>
								</div>
								<p className={`input-info-text ${invalid ? 'error-text-color' : ''}`}>
									Must have at least 8 characters with at least one capital letter, one number, and a
									special character
								</p>
							</div>
							<div className="email-container">
								<h6 className="email-heading color-gray900">Confirm Password</h6>
								<div className="email-container">
									<input
										className={invalidSecond ? 'email-input error-border' : 'email-input'}
										type="password"
										onChange={handleConfirmPassword}
										value={confirmPassword}
										minLength="8"
									/>
									<img
										className={invalidSecond ? 'input-img' : 'display-none'}
										src={process.env.PUBLIC_URL + '/images/error-img.svg'}
										alt="check"
									/>
									<img
										className={validSecond ? 'input-img' : 'display-none'}
										src={process.env.PUBLIC_URL + '/images/check.svg'}
										alt="check"
									/>
								</div>
								<p className={`input-info-text ${invalidSecond ? 'error-text-color' : ''}`}>
									Must have at least 8 characters with at least one capital letter, one number, and a
									special character
								</p>
							</div>
							<div className="email-container">
								<button
									className={`create-account-btn ${disable ? 'opacity-03' : 'opacity-01'}`}
									disabled={disable}
									type="submit"
								>
									Create Account
									<span
										className={`${
											buttonLoading === false ? '' : 'spinner-border spinner-border-sm'
										} `}
										style={{ marginLeft: '5px' }}
									></span>
								</button>
								<p className="create-tos color-gray700">
									By clicking continue you agree to our{' '}
									<a href={TermsOfUse} download="Terms of Use">
										<span className="color-blue700" style={{ padding: '0px' }}>
											Terms
										</span>
									</a>{' '}
									and{' '}
									<a href={PrivacyPolicy} download="Privacy Policy">
										<span className="color-blue700" style={{ padding: '0px' }}>
											Privacy Policy
										</span>
									</a>
									.
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
export default Account;