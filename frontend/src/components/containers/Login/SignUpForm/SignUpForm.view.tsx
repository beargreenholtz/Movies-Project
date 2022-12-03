import React, { FormEvent } from 'react';

import MCard from '../../../ui/MCard';
import { Formik, Form, Field, FormikConfig, FormikValues } from 'formik';
import MainNavigation from '../../../layout/MainNavigation';

import classes from './SignUpForm.module.scss';

interface IProps {
	onSubmit: (_: FormikValues) => void | Promise<any>;
}

interface MyFormValues {
	name: string;
	email: string;
}

const SignUpFormView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	const initialValues: MyFormValues = { name: '', email: '' };

	return (
		<section className={classes.container}>
			<MainNavigation />
			<MCard>
				<h1 className={classes.signInText}>Sign Up</h1>
				<div className={classes.signInCard}>
					<Formik initialValues={initialValues} onSubmit={props.onSubmit}>
						<Form className={classes.signUpForm}>
							<label htmlFor="name">Name</label>
							<Field name="name" type="text" />
							<label htmlFor="email">Email</label>
							<Field name="email" type="email" />
							<label htmlFor="password">Password</label>
							<Field name="password" type="password" />
							<button type="submit">Sign Up</button>
						</Form>
					</Formik>
				</div>
			</MCard>
		</section>
	);
};

SignUpFormView.displayName = 'SignUpFormView';
SignUpFormView.defaultProps = {};

export default React.memo(SignUpFormView);
