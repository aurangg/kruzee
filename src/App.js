import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetCode from './Components/Pages/GetCode';
import BookSession from './Components/Pages/BookSession';
import IndivialLesson from './Components/Pages/IndiviualLesson';
import Test from './Components/Pages/Test';
import Pricing from './Components/Pages/Pricing';
import DrivingTest from './Components/Pages/DrivingTest';
import Pickup from './Components/Pages/Pickup';
import Payment from './Components/Pages/Payment';
import PaymentSuccess from './Components/Pages/PaymentSuccess';
import Account from './Components/Pages/Account';
import Loader from './Components/Common/Loader';
import FourOFour from './Components/Common/404';
import StudentPortal from './Components/Pages/StudentPortal';
import SignIn from './Components/Pages/SignIn';
import OtpCode from './Components/Pages/OtpCode';
import ResetPassword from './Components/Pages/ResetPassword';
import OtpSuccess from './Components/Pages/otpSuccess';
import { IntercomProvider } from 'react-use-intercom';
import { Toaster } from 'react-hot-toast';
import { INTERCOM_APP_ID } from './Components/Common/constants';
import PortalPricing from './Components/Pages/Portal/PortalPricing';
import PortalDrivingTest from './Components/Pages/Portal/PortalDrivingTest';
import PortalPayment from './Components/Pages/Portal/PortalPayment';
import PortalIndiviualLesson from './Components/Pages/Portal/PortalIndiviualLesson';

function App() {
	return (
		<IntercomProvider appId={INTERCOM_APP_ID}>
			<BrowserRouter>
				<Toaster />
				<Routes>
					<Route path="/" element={<GetCode />} />
					<Route path="/pricing" element={<Pricing />} />
					<Route path="/indiviual-lesson" element={<IndivialLesson />} />
					<Route path="/driving-test" element={<DrivingTest />} />
					<Route path="/book-session" element={<BookSession />} />
					<Route path="/pick-up" element={<Pickup />} />
					<Route path="/test" element={<Test />} />
					<Route path="/payment-information" element={<Payment />} />
					<Route path="/payment-success" element={<PaymentSuccess />} />
					<Route path="/create-account" element={<Account />} />
					<Route path="/loader" element={<Loader />} />
					<Route path="/studentPortal" element={<StudentPortal />} />
					<Route path="/Signin" element={<SignIn />} />
					<Route path="/OtpCode" element={<OtpCode />} />
					<Route path="/verification-success" element={<OtpSuccess />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="*" element={<FourOFour />} />
					<Route path="/portalPricing" element={<PortalPricing />} />
					<Route path="/portalDrivingTest" element={<PortalDrivingTest />} />
					<Route path="/portalPayment" element={<PortalPayment />} />
					<Route path="/portalIndiviualLesson" element={<PortalIndiviualLesson />} />
				</Routes>
			</BrowserRouter>
		</IntercomProvider>
	);
}

export default App;
