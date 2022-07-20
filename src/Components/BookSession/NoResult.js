import React, { useEffect, useState } from 'react';
import '../css/onboarding.css';
import { Link, useNavigate } from 'react-router-dom';
import { isEmail } from 'validator';
import Toolbar from '../Common/Toolbar';
import ProgressBar from '../Common/ProgressBar';
import { getPostalCode } from '../utils/localStorage';
import { format } from 'date-fns';
import Loader from '../Common/Loader';

function NoResult() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [disable, setDisable] = useState(true);
	const [status, setStatus] = useState(0);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		document.title = 'No Instructors Found | Kruzee';
		if (status === 200) {
			setTimeout(() => {
				navigate('/');
			}, 2000);
		}
		return () => clearTimeout();
	});
	function handleEmail(e) {
		setEmail(e.target.value);
		if (isEmail(e.target.value)) {
			setEmailError('');
			setDisable(false);
		} else {
			setEmailError('Invalid Email');
			setDisable(true);
		}
	}

	const postalCode = getPostalCode().replace(/"/g, '');
	let currentDate = new Date();
	currentDate = format(currentDate, 'yyyy-MM-dd');

	const formSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const bodyData = {
			email: email,
			postalCode: postalCode,
			date: currentDate,
		};
		const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/student/addEmail`, {
			method: 'POST',
			body: JSON.stringify({ ...bodyData }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		setStatus(data.status);
		if (data.status === 200) {
			setLoading(false);
		}
	};
	if (loading) {
		return <Loader />;
	}

	return (
		<section className="simple-bg h-100vh">
			<div className="container">
				<Toolbar path="/driving-test" back_button="block" />
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
								progress: 'current',
							},
						]}
						account={[
							{
								progress: 'incomplete',
							},
						]}
						payment={[
							{
								progress: 'incomplete',
							},
						]}
					/>

					<div className="col-lg-4 offset-lg-4">
						<div className="no-instructor-box bg-gray200">
							<h2 className="no-instructor-heading color-gray900">We appreciate your patience</h2>
							<p className="no-instructor-description color-gray800">
								Unfortunately, all the instructors in your area are fully booked at this time, but we'll
								notify you as soon as one becomes available
							</p>
						</div>
						{status !== 200 ? (
							<form onSubmit={formSubmit}>
								<div className="email-container no-instructor-email">
									<div className="notify-email-width">
										<h6 className="email-heading color-gray900">Email Address</h6>
										<input
											className={`email-input ${emailError === '' ? '' : 'error-border'}`}
											type="email"
											onChange={handleEmail}
											value={email}
										/>
										<p className={`input-info-text ${emailError ? 'error-text-color' : ''}`}>
											{emailError}
										</p>
									</div>
									<div to="/" className="notify-me-btn-main">
										<button
											className={`notify-me-btn bg-blue500 ${
												disable ? 'opacity-03' : 'opacity-01'
											}`}
											disabled={disable}
											style={{ marginTop: `${emailError === '' ? '38px' : '25px'}` }}
										>
											Notify Me
										</button>
									</div>
								</div>
							</form>
						) : (
							<p style={{ textAlign: 'center' }}>Email sent successfully.</p>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export default NoResult;
