import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios, { AxiosError } from 'axios';

import SignInFormView from './SignInForm.view';
import { FormikValues } from 'formik';
import { AuthContext } from '../../../../context/authContext';

interface IProps {}

const SignInForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	const [isErrorLogin, setIsErrorLogin] = useState<boolean>(false);
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	const onLogin = async (values: FormikValues) => {
		try {
			const responseData = await axios.post(`http://localhost:5000/login/login`, values).then((res) => {
				console.log(res);
				auth.login(res.data.userId, res.data.token);
				navigate('/');
			});
		} catch (error) {
			setIsErrorLogin(true);
			if (axios.isAxiosError(error)) {
				let serverError = error as AxiosError;
				if (serverError && serverError.response) {
					let err = serverError.response.data;
					console.log(err);
				}
			}
		}
	};

	return <SignInFormView isError={isErrorLogin} onSubmit={onLogin} />;
};

SignInForm.displayName = 'SignInForm';
SignInForm.defaultProps = {};

export default React.memo(SignInForm);
