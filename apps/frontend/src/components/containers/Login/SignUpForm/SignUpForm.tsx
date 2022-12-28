import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import type { FormikValues } from 'formik';
import { AuthContext } from '../../../../context/authContext';
import SignUpFormView from './SignUpForm.view';

interface IProps {}

const SignUpForm: React.FC<IProps> = () => {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	const onSubmit = async (values: FormikValues) => {
		try {
			await axios.post('http://localhost:5000/login/signup', values).then((res) => {
				auth.login(res.data.userId, res.data.token);
				navigate('/');
			});
		} catch (err) {}
	};

	return <SignUpFormView onSubmit={onSubmit} />;
};

SignUpForm.displayName = 'SignUpForm';
SignUpForm.defaultProps = {};

export default React.memo(SignUpForm);
