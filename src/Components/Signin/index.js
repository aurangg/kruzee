import React from 'react';
import CustomNavbar from '../Common/CustomNavbar';
import SignInForm from './SignInForm';
import { useIntercom } from 'react-use-intercom';

const SignIn = () => {
	const { boot } = useIntercom();
	boot();
	return (
		<div className="body_wrapper">
			<CustomNavbar cClass="custom_container p0" hbtnClass="new_btn" />
			<SignInForm />
		</div>
	);
};
export default SignIn;
