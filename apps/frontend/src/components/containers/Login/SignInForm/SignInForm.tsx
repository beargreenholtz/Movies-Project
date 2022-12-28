import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios, { type AxiosError } from 'axios';

import type { FormikValues } from 'formik';
import { AuthContext } from '../../../../context/authContext';
import SignInFormView from './SignInForm.view';

interface IProps {}

const SignInForm: React.FC<IProps> = () => {
	const [error, setError] = useState<string>('');
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	const onLogin = async (values: FormikValues) => {
		try {
			await axios.post('http://localhost:5000/login/login', values).then((res) => {
				auth.login(res.data.userId, res.data.token);
				navigate('/');
			});
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const serverError = error as AxiosError<{ message: string }>;

				if (serverError && serverError.response) {
					const err = serverError.response.data.message;

					setError(err);
				}
			}
		}
	};

	return <SignInFormView error={error} onSubmit={onLogin} />;
};

SignInForm.displayName = 'SignInForm';
SignInForm.defaultProps = {};

export default React.memo(SignInForm);
