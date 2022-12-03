import React from 'react';

import SignUpForm from '../components/containers/Login/SignUpForm';

interface IProps {}

const SignUpFormPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return <SignUpForm />;
};

SignUpFormPage.displayName = 'SignUpFormPage';
SignUpFormPage.defaultProps = {};

export default SignUpFormPage;
