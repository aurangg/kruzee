import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostalCode from './Components/PostalCode';
import BookSession from './Components/BookSession';
import IndividualLesson from './Components/IndividualLesson';
import Test from './Components/Pages/Test';
import Pricing from './Components/Pricing';
import DrivingTest from './Components/DrivingTest';
import Pickup from './Components/studentPickUpLocation';
import Payment from './Components/Payment';
import PaymentSuccess from './Components/PaymentSuccess';
import CreateAccount from './Components/CreateAccount';
import Loader from './Components/Common/Loader';
import FourOFour from './Components/Common/404';
import StudentPortal from './Components/StudentPortal/StudentPortal';
import SignIn from './Components/Signin';
import OtpCode from './Components/ResetPassword/OtpCode';
import ResetPassword from './Components/ResetPassword';
import OtpSuccess from './Components/ResetPassword/otpSuccess';
import { IntercomProvider } from 'react-use-intercom';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<IntercomProvider appId={process.env.REACT_APP_INTERCOM_ID}>
			<BrowserRouter>
				<Toaster />
				<Routes>
					<Route path="/" element={<PostalCode />} />
					<Route path="/pricing" element={<Pricing />} />
					<Route path="/indiviual-lesson" element={<IndividualLesson />} />
					<Route path="/driving-test" element={<DrivingTest />} />
					<Route path="/book-session" element={<BookSession />} />
					<Route path="/pick-up" element={<Pickup />} />
					<Route path="/payment-information" element={<Payment />} />
					<Route path="/payment-success" element={<PaymentSuccess />} />
					<Route path="/create-account" element={<CreateAccount />} />
					{/* <Route path="/test" element={<Test />} /> */}
					<Route path="/loader" element={<Loader />} />
					<Route path="/studentPortal" element={<StudentPortal />} />
					<Route path="/Signin" element={<SignIn />} />
					<Route path="/OtpCode" element={<OtpCode />} />
					<Route path="/verification-success" element={<OtpSuccess />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="*" element={<FourOFour />} />
					{/* <Route path="/portalPricing" element={<PortalPricing />} /> */}
					<Route path="/portalIndiviualLesson" element={<IndividualLesson />} />
					<Route path="/portalPricing" element={<Pricing />} />
					<Route exact path="/portalDrivingTest" element={<DrivingTest />} />
					<Route path="/portalPayment" element={<Payment />} />
					<Route path="/successPortal" element={<PaymentSuccess />} />
				</Routes>
			</BrowserRouter>
		</IntercomProvider>
	);
}

export default App;
