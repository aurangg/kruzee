import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LargeHeading from '../Common/LargeHeading';
import ProgressBar from '../Common/ProgressBar';
import Toolbar from '../Common/Toolbar';
import './onboarding.css';
import './radio-button.css';
import { useIntercom } from 'react-use-intercom';
import { ONE_LESSON_PRICE } from '../Common/constants';

function IndiviualLesson() {
	const { boot } = useIntercom();
	boot();
	const values = [
		{
			id: 0,
			lessons: 1,
			price: 65,
			save: false,
			saveAmount: 0,
			icon: '',
			bg: '',
		},
		{
			id: 1,
			lessons: 5,
			price: 300,
			save: true,
			saveAmount: 30,
			icon: '🎉',
			bg: '#37A2D0',
		},
		{
			id: 2,
			lessons: 10,
			price: 550,
			save: true,
			saveAmount: 100,
			icon: '😍',
			bg: '#E5805F',
		},
	];
	const [activeClass, setActiveClass] = useState(null);
	const [disabled, setDisable] = useState(true);
	const [radioValue, setRadioValue] = useState('Value 1');
	const handleChange = useCallback((index, lesson, price) => {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
		window.dataLayer.push({
			event: 'individual_lesson_viewed',
			ecommerce: {
				currency: 'CAD',
				value: ONE_LESSON_PRICE.SINGLE_LESSON_PRICE * lesson,
				items: [
					{
						item_id: 'item_id',
						item_name: 'Driving Practice Lessons',
						affiliation: 'Kruzee',
						currency: 'CAD',
						index: 1,
						item_brand: 'Kruzee',
						item_category: 'In-car lessons with an MTO-certified Kruzee instructor',
						item_list_id: 'item_list_id',
						item_list_name: 'Landing Page Offer',
						item_variant: '',
						price: ONE_LESSON_PRICE.SINGLE_LESSON_PRICE * lesson,
						quantity: lesson,
					},
				],
			},
		});
		console.log('window.dataLayer', window.dataLayer);
		return (e) => {
			setRadioValue(e.target.value);
			setActiveClass(index);
			localStorage.setItem('lesson', JSON.stringify(lesson));
			localStorage.setItem('price', JSON.stringify(price));
			setDisable(false);
		};
	});

	useEffect(() => {
		document.title = 'Select No. of Lessons | Kruzee';
		localStorage.removeItem('lesson');
		localStorage.removeItem('price');
	}, []);

	return (
		<section className="simple-bg">
			<div className="container">
				<Toolbar path="/" back_button="block" />
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
					<div className="col-lg-6 offset-lg-3">
						<LargeHeading large_heading="How many lessons you would like to book?" />
						<div className="align-items-center">
							<p className="onboarding-description indiviual-lesson-description">
								You’ll save money by purchasing more lessons up front. You can schedule these lessons in
								your dashboard.
							</p>
						</div>
					</div>
				</div>
				<form>
					<div className="row">
						{values.map((i, index) => (
							<div className="col-lg-4 offset-lg-4" key={index}>
								<label
									className={`indiviual-lesson my-container ${
										activeClass === index ? 'special-active' : ''
									}`}
									id="first"
								>
									<input
										type="radio"
										value={i.lessons}
										name="lesson-name"
										onClick={handleChange(index, i.lessons, i.price)}
										className="radio-buttons"
									/>
									<span className="checkmark"></span>
									<div className="lesson-count">
										<p className="lesson-number color-gray900">{i.lessons}</p>
										{i.lessons > 1 ? (
											<p className="lesson-name color-gray900">lessons</p>
										) : (
											<p className="lesson-name color-gray900">lessons</p>
										)}
									</div>
									<div className="lesson-prices">
										{i.save ? (
											<div className="discount-box" style={{ backgroundColor: i.bg }}>
												<div
													className="arrow-right"
													style={{ borderLeft: `6px solid ${i.bg}` }}
												></div>
												<p className="discount-text">
													{i.icon} Save ${i.saveAmount}
												</p>
											</div>
										) : (
											<></>
										)}
										<div style={{ width: 'max-content' }}>
											<p className="lesson-price color-gray900">CA ${i.price}</p>
											<p className="per-lesson-price color-gray600">
												(${i.price / i.lessons}/lesson)
											</p>
										</div>
									</div>
								</label>
							</div>
						))}
					</div>
					<div className="col-lg-4 offset-lg-4">
						<Link to="/driving-test">
							<button
								className={`indiviuial-lesson-btn submit-btn ${
									disabled === false ? 'opacity-01' : 'opacity-03'
								}`}
								disabled={disabled}
							>
								Continue
							</button>
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
}

export default IndiviualLesson;
