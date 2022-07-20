import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import Link from 'react-scroll/modules/components/Link';
import LargeHeading from '../Common/LargeHeading';
import Loader from '../Common/Loader';
import '../css/onboarding.css';
import { useIntercom } from 'react-use-intercom';

function OtpCode({ email, password, verificationCode, phoneNumber }) {
	const { boot } = useIntercom();
	boot();
	const navigate = useNavigate();

	const [otpCode, setOtpCode] = useState(0);

	const [disabled, setDisable] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [verifyCode, setVerifyCode] = useState(verificationCode);

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
		setButtonLoading(true);
		if (parseInt(otpCode) === verifyCode) {
			try {
				const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/student/changePassword`, {
					email: email.toLowerCase(),
					password: password,
				});

				if (data.status === 200) {
					setButtonLoading(false);
					navigate('/verification-success');
				} else {
					setButtonLoading(false);
					toast.error('Opps! something went wrong. Please try again');
				}
			} catch (error) {
				setButtonLoading(false);
				toast.error('Opps! something went wrong. Please try again');
			}
		} else {
			setButtonLoading(false);
			toast.error('Verification code is incorrect. Please try again');
		}
	}

	const handleResend = async () => {
		setLoading(true);
		const recipient = '+1' + phoneNumber.replace(/-/g, '');
		const verificationCodeGenerate = Math.floor(100000 + Math.random() * 900000);
		setVerifyCode(verificationCodeGenerate);
		const OtpCodeBody = {
			email: email.toLowerCase(),
			verificationCode: verificationCodeGenerate,
		};
		const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/student/sendVerificationCode`, {
			...OtpCodeBody,
		});
		if (data.status === 200) {
			toast.success(`A verification code has been sent via sms`, { duration: 5000 });
			setLoading(false);
		} else {
			toast.error('Opps! something went wrong. Please try again');
			setLoading(false);
		}
	};

	return (
		<section className="simple-bg">
			{loading ? (
				<Loader />
			) : (
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
										<Link to="" className="resend-button" onClick={handleResend}>
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
									<span
										className={`${
											buttonLoading === false ? '' : 'spinner-border spinner-border-sm'
										} `}
										style={{ marginLeft: '5px' }}
									></span>
								</button>
								{/* </Link> */}
							</form>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

export default OtpCode;
