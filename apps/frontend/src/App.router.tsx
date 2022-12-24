import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUpForm from './components/containers/Login/SignUpForm';

interface IProps {}

const Main = React.lazy(() => import('./pages/Main'));
const Login = React.lazy(() => import('./pages/Login'));

const AppRouter: React.FC<IProps> = () => (
	<Routes>
		<Route path="/" element={<Main />} />
		<Route path="/login" element={<Login />} />
		<Route path="/login/signup" element={<SignUpForm />} />
	</Routes>
);

AppRouter.displayName = 'AppRouter';
AppRouter.defaultProps = {};

export default React.memo(AppRouter);
