import React from 'react';

import MCard from '../../../ui/MCard';
import { Formik, Field, Form, FormikValues } from 'formik';
import MainNavigation from '../../../layout/MainNavigation';

import classes from './SignInForm.module.scss';

interface IProps {
	onSubmit: (_: FormikValues) => void | Promise<any>;
	error: string;
}

interface MyFormValues {
	name: string;
	email: string;
}

const SignInFormView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return (
		<section className={classes.container}>
			<MainNavigation />
			<MCard>
				<h1 className={classes.signInText}>Login</h1>
				<div className={classes.signInCard}>
					<Formik initialValues={{ name: '', email: '' }} onSubmit={props.onSubmit}>
						<Form className={classes.signInform}>
							<label htmlFor="email">Email</label>
							<Field name="email" type="email" />
							<label htmlFor="password">Password</label>
							<Field name="password" type="password" />
							<button type="submit">Sign In</button>
						</Form>
					</Formik>
				</div>
				{props.error && <p className={classes.inputError}>{props.error}</p>}
			</MCard>
		</section>
	);
};

SignInFormView.displayName = 'SignInFormView';
SignInFormView.defaultProps = {};

export default React.memo(SignInFormView);
