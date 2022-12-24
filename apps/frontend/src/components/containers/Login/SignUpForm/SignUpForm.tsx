import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import SignUpFormView from './SignUpForm.view';
import { FormikValues } from 'formik';
import { AuthContext } from '../../../../context/authContext';

interface IProps {}

const SignUpForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	const onSubmit = async (values: FormikValues) => {
		try {
			axios.post(`http://localhost:5000/login/signup`, values).then((res) => {
				// console.log(res);
				// console.log(res.data);
				auth.login(res.data.userId, res.data.token);
				navigate('/');
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
