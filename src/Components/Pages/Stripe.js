import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { withRouter } from 'react-router-dom';
import PackageOverview from '../components/PackageOverview';
import cardIcon from '../img/cardsIcon.png';
import cardIcon2 from '../img/cardsIcon2.png';
import {
	CardElement,
	useStripe,
	useElements,
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
} from '@stripe/react-stripe-js';
import {
	getUser,
	setStripeCustomerId,
	getLessons,
	getPrice,
	getIsBDE,
	getIndividualPackage,
	setAccountCreatedMsg,
} from '../helper/localStorage';
import { createStudent, addLessons, addStudentPayment, paymentSuccessNotification } from './APIs';
import { Input } from '@material-ui/core';
import { applyTax } from './utils';
const Subscribe = ({ location, history }) => {
	const selectedPackage = getIndividualPackage();
	const isBDE = getIsBDE();
	const user = getUser();
	const lessons = getLessons();
	const price = getPrice();
	const [messages, _setMessages] = useState('');
	const [paymentIntent, setPaymentIntent] = useState();
	const [loading, setLoading] = useState(false);
	// helper for displaying status messages.
	const setMessage = (message) => {
		_setMessages(`${messages}\n\n${message}`);
	};
	// Initialize an instance of stripe.
	const stripe = useStripe();
	const elements = useElements();
	if (!stripe || !elements) {
		// Stripe.js has not loaded yet. Make sure to disable
		// form submission until Stripe.js has loaded.
		return '';
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		// 1. Create Customer
		const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/student/createStripeCustomer`, {
			email: user.email,
		});
		setStripeCustomerId(data.data.data.id);
		// 2. Card Element from
		const cardNumberElement = elements.getElement(CardNumberElement);
		// 3. Make Stripe Payment
		const PaymentData = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/student/makeStripePayment`, {
			payment: price,
			customerId: data.data.data.id,
			email: user.email,
		});
		if (PaymentData?.status !== 200) {
			toast.error('INTERNAL SERVER ERROR');
			setLoading(false);
		}
		// 4. Confirm Payment to Stripe
		//Use card Element to tokenize payment details
		let { error, paymentIntent } = await stripe.confirmCardPayment(PaymentData?.data?.client_secret, {
			payment_method: {
				card: cardNumberElement,
				billing_details: {
					name: user.name,
					email: user.email,
				},
			},
		});
		// 5. Create Student to database
		if (error) {
			// show error and collect new card details.
			setMessage(error.message);
			toast.error('Payment confirm Error');
			setLoading(false);
			return;
		} else {
			setPaymentIntent(paymentIntent);
		}
	};

	if (paymentIntent && paymentIntent.status === 'succeeded') {
		// return <Redirect to={{ pathname: "/" }} />;
		const createStudentAndPayment = async () => {
			const student = await createStudent();
			const studentData = student?.data?.data;
			const lessons = await addLessons(studentData);
			const lessonId = lessons?.data;
			addStudentPayment(studentData);
		};
		createStudentAndPayment();
		// studentLogin(user.email, user.password);
		toast.success('Payment Successful');
		setAccountCreatedMsg('true');
		history.push('/SignIn');
	}
	const cardElementOptions = {
		style: {
			base: {
				backgroundColor: '#FAF9F7',
				border: '1px solid #c4c4c4',
				lineHeight: 3,
				padding: '20px 40px',
				'::placeholder': {
					color: '#c4c4c4',
				},
			},
		},
	};
	return (
		<div>
			<Toaster />
			<div className="row" style={{ borderBottom: '1px #EFEFEF Solid' }}>
				<div className="col-lg-4 py-2">
					<a className="pl-md-5" href="/" role="button">
						<img src={require('../img/logo.svg')} width="200" alt="logo" />
					</a>
				</div>
			</div>
			<div className="stripe-container container" style={{ minHeight: '100vh' }}>
				<div className="row mx-4">
					<div className="col-md-6 px-2">
						<PackageOverview />
					</div>
					<div className="col-md-6 px-2" style={{ alignSelf: 'center' }}>
						<div className="stripe-form-box">
							<div className="row mt-4">
								<p
									className=""
									style={{
										fontWeight: '800',
										fontSize: 34,
										color: 'black',
										textAlign: 'left',
									}}
								>
									Checkout
								</p>
							</div>
							<form onSubmit={handleSubmit}>
								<div className="row">
									<Input
										disableUnderline={true}
										type="text"
										name="name"
										placeholder="Name on card"
										style={{
											backgroundColor: '#FAF9F7',
											border: '1px solid #c4c4c4',
											borderRadius: 8,
											paddingTop: 10,
											paddingBottom: 10,
											width: '100%',
											paddingLeft: 10,
										}}
										required
									/>
								</div>
								<div className="row">
									<p
										className="mt-3"
										style={{
											fontWeight: '600',
											fontSize: 22,
											color: 'black',
											textAlign: 'left',
											padding: 5,
											paddingLeft: 0,
										}}
									>
										Card information
									</p>
								</div>
								<div className="row pb-1">
									<div
										className="col-md-8 mb-2"
										style={{
											backgroundColor: '#FAF9F7',
											border: '1px solid #c4c4c4',
											borderRadius: 8,
										}}
									>
										<CardNumberElement className="pb-1" options={cardElementOptions} />
									</div>
									<div className="col-md-4" style={{ alignSelf: 'center', textAlign: 'right' }}>
										<img className="img-fluid mt-1" src={cardIcon} alt="" />
									</div>
								</div>
								<div className="row pb-4 my-0 d-flex justify-content-between">
									<div
										className="col-md-5 mb-2"
										style={{
											backgroundColor: '#FAF9F7',
											border: '1px solid #c4c4c4',
											borderRadius: 8,
											marginBottom: '10px',
										}}
									>
										<CardExpiryElement className="w-100 pb-1" options={cardElementOptions} />
									</div>
									<div
										className="col-md-5 d-flex w-100 mb-2"
										style={{
											backgroundColor: '#FAF9F7',
											border: '1px solid #c4c4c4',
											borderRadius: 8,
											marginBottom: '10px',
										}}
									>
										<CardCvcElement className="w-85 pb-1" options={cardElementOptions} />
										<div className="col-md-4 p-1 w-15">
											<img
												className="img-fluid"
												style={{ width: '20px', height: '20px' }}
												src={cardIcon2}
												alt=""
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<button
										className="price_btn9"
										style={{
											width: '100%',
											backgroundColor: '#37A2D0',
											borderRadius: 6,
											fontWeight: '700',
											fontSize: 18,
										}}
									>
										{loading ? 'Making payment' : `Pay C$${price}`}
									</button>
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
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default withRouter(Subscribe);
