import React from 'react';

import axios from 'axios';

import SignUpFormView from './SignUpForm.view';
import { FormikValues } from 'formik';

interface IProps {}

const SignUpForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	const onSubmit = async (values: FormikValues) => {
		try {
			axios.post(`http://localhost:5000/login/signup`, values).then((res) => {
				console.log(res);
				console.log(res.data);
			});
		} catch (err) {
			console.log(err);
		}
	};

	return <SignUpFormView onSubmit={onSubmit} />;
};

SignUpForm.displayName = 'SignUpForm';
SignUpForm.defaultProps = {};

export default React.memo(SignUpForm);
