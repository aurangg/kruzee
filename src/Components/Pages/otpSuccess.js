import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OtpSuccess() {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate('/Signin');
		}, 3000);
	});
	return (
		<section className="simple-bg">
			<div className="container">
				<div className="row">
					<div className="col-lg-6 offset-lg-3">
						<div className="payment-success h-100vh">
							<img src={process.env.PUBLIC_URL + '/images/payment-success.svg'} alt="check" />
							<h2 className="payment-success-text color-gray900">Password has been reset!</h2>
							<p className="payment-success-info color-gray800">
								Password change successful! We’re redirecting you to your learning portal...
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default OtpSuccess;
