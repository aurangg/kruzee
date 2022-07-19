import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
	const navigate = useNavigate();

	useEffect(() => {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
		if (localStorage.getItem('roadTestVechicle')) {
			window.dataLayer.push({
				event: 'purchase',
				ecommerce: {
					currency: 'CAD',
					transaction_id: 'T_12345',
					value: 1062.2,
					shipping: 0.0,
					// shipping: 00.00,
					tax: 122.2, //HST (13%)
					coupon: 'SUMMER_FUN',
					items: [
						{
							item_id: 'item_id',
							item_name: 'Full Package',
							affiliation: 'Kruzee',
							currency: 'CAD',
							index: 0,
							item_brand: 'Kruzee',
							item_category: "Kruzee's MTO-approved certificate course",
							item_list_id: 'item_list_id',
							item_list_name: 'Landing Page Offer',
							item_variant: '',
							price: 695.0,
							quantity: 1,
						},
						{
							item_id: 'item_id',
							item_name: 'Vehicle Opt-In',
							affiliation: 'Kruzee',
							currency: 'CAD',
							index: 0,
							item_brand: 'Kruzee',
							item_category: "Kruzee's MTO-approved certificate course",
							item_list_id: 'item_list_id',
							item_list_name: 'Vehicle Options',
							item_variant: '',
							price: 245.0,
							quantity: 1,
						},
					],
				},
			});
		} else {
			window.dataLayer.push({
				event: 'purchase',
				ecommerce: {
					currency: 'CAD',
					transaction_id: 'T_12345',
					value: 1062.2,
					shipping: 0.0,
					tax: 122.2, //HST (13%)
					coupon: 'SUMMER_FUN',
					items: [
						{
							item_id: 'item_id',
							item_name: 'Full Package',
							affiliation: 'Kruzee',
							currency: 'CAD',
							index: 0,
							item_brand: 'Kruzee',
							item_category: "Kruzee's MTO-approved certificate course",
							item_list_id: 'item_list_id',
							item_list_name: 'Landing Page Offer',
							item_variant: '',
							price: 695.0,
							quantity: 1,
						},
					],
				},
			});
		}
	});
	useEffect(() => {
		if (window.location.pathname === '/successPortal') {
			setTimeout(() => {
				navigate('/StudentPortal');
			}, 3000);
		} else {
			setTimeout(() => {
				navigate('/SignIn');
			}, 3000);
		}
	});
	return (
		<section className="simple-bg">
			<div className="container">
				<div className="row">
					<div className="col-lg-6 offset-lg-3">
						<div className="payment-success h-100vh">
							<img src={process.env.PUBLIC_URL + '/images/payment-success.svg'} alt="check" />
							<h2 className="payment-success-text color-gray900">Payment Success!</h2>
							<p className="payment-success-info color-gray800">
								Thank you for booking with Kruzee! We’re redirecting you to your dashboard...
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default PaymentSuccess;
