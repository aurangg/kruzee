import { Link } from 'react-router-dom';
import { useIntercom } from 'react-use-intercom';

function FourOFour() {
	const { boot } = useIntercom();
	boot();
	return (
		<section className="four-o-four-section">
			<div className="container">
				<div className="row">
					<div
						className="col-lg-8 offset-lg-2 h-100vh align-items-center"
						style={{ flexDirection: 'column' }}
					>
						<img style={{ width: '100%' }} src={process.env.PUBLIC_URL + '/images/404.svg'} alt="tick" />
						<p className="four-o-four-text">Hey! Looks like we are a bit lost here.</p>
						<p className="four-o-four-text">
							In the mean time, would you like to Schedule your first lesson?
						</p>
						<Link to="/">
							<div className="submit-btn">Schedule Lesson</div>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export default FourOFour;
