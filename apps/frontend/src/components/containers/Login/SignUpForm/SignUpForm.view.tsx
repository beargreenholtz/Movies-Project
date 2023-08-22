import React from 'react';

import type { FormikValues } from 'formik';
// eslint-disable-next-line no-duplicate-imports
import { Formik, Form, Field } from 'formik';
import MCard from '../../../ui/MCard';
import MainNavigation from '../../../layout/MainNavigation';

import classes from './SignUpForm.module.scss';

interface IProps {
	readonly error: string;
	readonly onSubmit: (_: FormikValues) => void | Promise<unknown>;
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
				{props.error && <p className={classes.inputError}>nofawfawfjj</p>}
			</MCard>
		</section>
	);
};

SignUpFormView.displayName = 'SignUpFormView';
SignUpFormView.defaultProps = {};

export default React.memo(SignUpFormView);
