import React from 'react';
import CustomNavbar from '../Common/CustomNavbar';
import SignInForm from './SignInForm';
// import FooterData from '../components/Footer/FooterData';
// import FooterOnboard from '../components/Footer/FooterOnboard';

const SignIn = () => {
	return (
		<div className="body_wrapper">
			<CustomNavbar cClass="custom_container p0" hbtnClass="new_btn" />
			<SignInForm />
			{/* <FooterOnboard FooterData={FooterData} /> */}
		</div>
	);
};
export default SignIn;
