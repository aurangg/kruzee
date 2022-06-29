import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LargeHeading from '../../Common/LargeHeading';
import ProgressBar from '../../Common/ProgressBar';
import Toolbar from '../../Common/Toolbar';
import { useIntercom } from 'react-use-intercom';

function PortalIndiviualLesson() {
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
		return (e) => {
			setRadioValue(e.target.value);
			setActiveClass(index);
			localStorage.setItem('lesson', JSON.stringify(lesson));
			localStorage.setItem('price', JSON.stringify(price));
			setDisable(false);
		};
	});

    const [custom, setCustom] = useState(1)

    const handleCustom = (e) => {
        setCustom(e.target.value)
    }

	useEffect(() => {
		document.title = 'Select No. of Lessons | Kruzee';
		localStorage.removeItem('lesson');
		localStorage.removeItem('price');
	}, []);

	return (
		<section className="simple-bg">
			<div className="container">
				<Toolbar path="/portalPricing" back_button="block" />
				<div className="row">
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
											<p className="lesson-name color-gray900">lesson</p>
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
                        <div className="col-lg-4 offset-lg-4">
                            <label
                                className={`indiviual-lesson my-container ${
                                    activeClass >= 4 ? 'special-active' : ''
                                }`}>
                                <input
                                    type="radio"
                                    value={0}
                                    name="lesson-name"
                                    // onClick={handleChange(index, i.lessons, i.price)}
                                    className="radio-buttons"
                                />
                                <span className="checkmark"></span>
                                <div className="lesson-count lesson-count-2">
                                    {/* <p className="lesson-number color-gray900">10</p> */}
                                    <div style={{display:"flex", alignItems:"flex-start", flexDirection:"column"}}>
                                        <input className='lesson-number color-gray900' style={{width:"20%"}} value={custom} onChange={handleCustom}></input>
                                        <p className="lesson-name color-gray900">lessons</p>
                                    </div>
                                </div>
                                <div className="lesson-prices">
                                    <div style={{ width: 'max-content' }}>
                                        <p className="lesson-price color-gray900">CA $450</p>
                                        <p className="per-lesson-price color-gray600">
                                            ${450/ 10}/lesson
                                        </p>
                                    </div>
                                </div>
                            </label>
                        </div>
					</div>

					<div className="col-lg-4 offset-lg-4">
						<Link to="/portalDrivingTest">
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

export default PortalIndiviualLesson;
