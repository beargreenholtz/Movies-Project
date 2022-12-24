import React from 'react';

import SignInForm from '../components/containers/Login/SignInForm';

interface IProps {}

const LoginPage: React.FC<IProps> = () => {
	return <SignInForm />;
};

LoginPage.displayName = 'LoginPage';
LoginPage.defaultProps = {};

export default LoginPage;
