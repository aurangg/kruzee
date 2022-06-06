import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import Link from 'react-scroll/modules/components/Link';
import LargeHeading from '../Common/LargeHeading';
import './onboarding.css';

function OtpCode({ email, password, verificationCode, phoneNumber }) {
	const navigate = useNavigate();

	console.log('phoneNumber', phoneNumber);
	const [otpCode, setOtpCode] = useState(0);

	const [disabled, setDisable] = useState(true);

	useEffect(() => {
		document.title = 'Enter Otp Code | Kruzee';
		if (otpCode.length === 6) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	}, [otpCode]);
	const handleChange = (code) => {
		setOtpCode(code);
	};

	function submitForm(e) {
		e.preventDefault();
	}

	async function handleOtpCode() {
		console.log('otpCode, verificationCode', parseInt(otpCode), verificationCode);
		if (parseInt(otpCode) === verificationCode) {
			const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/student/changePassword`, {
				email: email,
				password: password,
			});
			console.log('data', data);
			if (data.status === 200) {
				navigate('/verification-success');
			} else {
				toast.error('Verification code is incorrect. Please try again');
			}
		} else {
			toast.error('Verification code is incorrect. Please try again');
		}
		localStorage.setItem('postalCode', JSON.stringify(otpCode));
	}

	const handleResend = () => {
		const recipient = '+1' + phoneNumber.replace(/-/g, '');
		const verificationCodeGenerate = Math.floor(100000 + Math.random() * 900000);
		verificationCode = verificationCodeGenerate;
		console.log('verificationCode', verificationCodeGenerate, recipient);

		const OtpCodeBody = {
			email: email,
			verificationCode: verificationCodeGenerate,
		};
		const data = axios.post(`${process.env.REACT_APP_BASE_URL}/api/student/sendVerificationCode`, {
			...OtpCodeBody,
		});
		if (data.status === 200) {
			toast.success(`A verification code has been sent via sms`, { duration: 5000 });
		} else {
			toast.error('Opps! something went wrong. Please try again');
		}
	};
	return (
		<section className="simple-bg">
			<div className="container h-100vh">
				{/* <Toolbar path="/" back_button="none" /> */}
				<div className="row">
					<div className="col-12 get-code-margin">
						<LargeHeading large_heading="Enter verification code" />
					</div>
					<div className="col-lg-6 offset-lg-3">
						<form onSubmit={submitForm} className="form-class">
							<div className="">
								<p className="color-gray700 code-instruction mt-4 mb-0">
									{`Input the code we sent to +1 xxx-xxx-xx${phoneNumber}`}
								</p>
								<div className="space-around-center mt-3">
									<OtpInput
										inputStyle="get-code-input"
										value={otpCode}
										onChange={handleChange}
										numInputs={6}
										shouldAutoFocus={true}
									/>
								</div>
								<p className="color-gray700 code-instruction mt-4 mb-0">
									Didn't receive a code?{' '}
									<Link className="resend-button" onClick={handleResend}>
										{' '}
										Resend
									</Link>
								</p>
							</div>
							{/* <Link to="/signIn"> */}
							<button
								type="submit"
								onClick={handleOtpCode}
								className={disabled ? 'submit-btn opacity-03' : 'submit-btn opacity-01'}
								disabled={disabled}
							>
								Verify
							</button>
							{/* </Link> */}
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default OtpCode;
