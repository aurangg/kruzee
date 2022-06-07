import React, { useEffect } from 'react';
import ProgressBar from '../Common/ProgressBar';
import Toolbar from '../Common/Toolbar';
import { useIntercom } from 'react-use-intercom';
import Map from './Map';

function Pickup() {
	const { boot } = useIntercom();
	boot();
	useEffect(() => {
		document.title = 'Pick Up Locations | Kruzee';
	}, []);
	return (
		<React.Fragment>
			<section className="special-bg">
				<div className="container">
					<Toolbar path="/book-session" back_button="block" />
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
					</div>
				</div>
			</section>
			<Map />
		</React.Fragment>
	);
}

export default Pickup;
