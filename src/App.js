import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lessons from './Components/Pages/Lessons';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetCode from './Components/Pages/GetCode';
import Packages from './Components/Pages/Packages';
import BookSession from './Components/Pages/BookSession';
import NoResult from './Components/Pages/NoResult';
import IndivialLesson from './Components/Pages/IndiviualLesson';
import Test from './Components/Pages/Test';
import Pricing from './Components/Pages/Pricing';
import DrivingTest from './Components/Pages/DrivingTest';
import Pickup from './Components/Pages/Pickup';
import Maps from './Components/Pages/Map';
import Payment from './Components/Pages/Payment';
import PaymentSuccess from './Components/Pages/PaymentSuccess';
import Account from './Components/Pages/Account';
import BookSessionTest from './Components/Pages/BookSessionTest';
import AccountValidate from './Components/Common/Old/AccountValidate';
import Loader from './Components/Common/Loader';
import FourOFour from './Components/Common/404';
import StudentPortal from './Components/Pages/StudentPortal';
import SignIn from './Components/Pages/SignIn';
import BookSessionTest2 from './Components/Pages/BookSessionTest2';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<GetCode />} />
				<Route path="/book-session" element={<BookSession />} />
				<Route path="/indiviual-lesson" element={<IndivialLesson />} />
				<Route path="/pricing" element={<Pricing />} />
				<Route path="/driving-test" element={<DrivingTest />} />
				<Route path="/pick-up" element={<Pickup />} />
				<Route path="/test" element={<Test />} />
				<Route path="/payment-information" element={<Payment />} />
				<Route path="/payment-success" element={<PaymentSuccess />} />
				<Route path="/create-account" element={<Account />} />
				<Route path="/loader" element={<Loader />} />
				<Route path="/studentPortal" element={<StudentPortal />} />
				<Route path="/Signin" element={<SignIn />} />
				<Route path="*" element={<FourOFour />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
