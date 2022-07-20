import React, { useEffect, useState } from 'react';
import LargeHeading from '../Common/LargeHeading';

import { isEmail, isStrongPassword } from 'validator';
import '../css/onboarding.css';
import '../css/radio-button.css';
import OtpCode from './OtpCode';
import toast from 'react-hot-toast';
import { useIntercom } from 'react-use-intercom';

function Account() {
	const { boot } = useIntercom();
	boot();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
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
	const [errorBox, setErrorBox] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [verificationCode, setVerificationCode] = useState();
	const [isOpen, setIsOpen] = useState(false);
	const [phoneDigit, setPhoneDigit] = useState();

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
		if (email != '' && password === confirmPassword && password != '') {
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
		const recipient = '+1' + phoneNumber.replace(/-/g, '');
		const verificationCodeGenerate = Math.floor(100000 + Math.random() * 900000);
		setVerificationCode(verificationCodeGenerate);
		const OtpCodeBody = {
			email: email.toLowerCase(),
			verificationCode: verificationCodeGenerate,
		};
		const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/sendVerificationCode`, {
			method: 'POST',
			body: JSON.stringify({ ...OtpCodeBody }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const responseData = await data.json();

		setPhoneDigit(responseData.slicedNumber);

		if (data.status === 200 && responseData) {
			setDisable(false);
			setButtonLoading(false);
			setErrorBox(false);
			toast.success(`A verification code has been sent via sms`, { duration: 5000 });
			setIsOpen(true);
		} else {
			setDisable(true);
			setErrorBox(true);
			setButtonLoading(false);
		}
	};

	return (
		<section className="simple-bg h-100vh">
			<div className="container mb-100">
				{/* <Toolbar path="/pick-up" back_button="display" /> */}
				<div className="row">
					<div className="col-lg-4 offset-lg-4">
						<LargeHeading large_heading="Reset Password" />
						{/* <p className="onboarding-description hide-on-desktop">
							You will be able to manage your lessons, and track your progress
						</p> */}
					</div>
					{errorBox ? (
						<div className="col-lg-4 offset-lg-4">
							<div className="error-user-box">
								<p className="error-user-text">Invalid email or Number</p>
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
							{/* <div className="email-container">
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
							</div> */}
							<div className="email-container">
								<h6 className="email-heading color-gray900">New Password</h6>
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
									Must have at least 8 characters with at least one capital letter and a special
									character
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
									Must have at least 8 characters with at least one capital letter and a special
									character
								</p>
							</div>
							<div className="email-container">
								<button
									className={`create-account-btn ${disable ? 'opacity-03' : 'opacity-01'}`}
									disabled={disable}
									type="submit"
								>
									Send Verification Code
									<span
										className={`${
											buttonLoading === false ? '' : 'spinner-border spinner-border-sm'
										} `}
										style={{ marginLeft: '5px' }}
									></span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			{isOpen && (
				<OtpCode
					email={email}
					password={password}
					verificationCode={verificationCode}
					phoneNumber={phoneDigit}
				/>
			)}
		</section>
	);
}
export default Account;
