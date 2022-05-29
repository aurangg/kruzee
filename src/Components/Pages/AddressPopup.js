import React from 'react';

const AddressPopup = (props) => {
	return (
		<div className="popup-box">
			<div className="box-2 width-90" style={{}}>
				<span className="close-icon-2 " style={{}} onClick={props.handleClose}>
					x
				</span>
				<div className="mx-4 mt-2 mb-3 pb-2">
					<h2
						className="mb-3 heading-text_f-size"
						style={{
							color: 'black',
							fontWeight: 700,
						}}
					>
						Complete address
					</h2>
					{props.address}
				</div>
			</div>
		</div>
	);
};

export default AddressPopup;
