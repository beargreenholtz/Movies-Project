import React, { useContext, useRef, type Dispatch, type SetStateAction } from 'react';

import axios from 'axios';
import { AuthContext } from '../../../../context/authContext';

import FormView from './Form.view';

interface IProps {
	readonly closeModalHandler: () => void;
	readonly setIsError: Dispatch<SetStateAction<string>>;
	readonly isError: string;
}

const Form: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	const auth = useContext(AuthContext);

	const titleRef = useRef<HTMLInputElement | null>(null);
	const genreRef = useRef<HTMLSelectElement | null>(null);
	const vidurlRef = useRef<HTMLInputElement | null>(null);
	const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

	const onSubmit = async (e: React.FormEvent) => {
		const title = titleRef.current?.value;
		const genre = genreRef.current?.value;
		const vidurl = vidurlRef.current?.value;
		const description = descriptionRef.current?.value;

		e.preventDefault();
		const customConfig = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + auth.token,
			},
		};

		let video = JSON.stringify({ title, description, genre, vidurl, creator: auth.userId });

		try {
			await axios.post('http://localhost:5000/video/addVid', video, customConfig);
			props.closeModalHandler();
			video = '';
		} catch (err) {
			if (!auth.token) {
				props.setIsError('Login to create a video');
			} else {
				props.setIsError('Invalid Inputs');
			}
		}

		//move props from main.

		// if (selectedCategory === undefined && oprtionEvent === undefined) {
		// 	setReload(!reload);
		// } else {
		// 	window.location.reload();
		// }
	};

	return (
		<FormView
			titleRef={titleRef}
			genreRef={genreRef}
			vidurlRef={vidurlRef}
			descriptionRef={descriptionRef}
			isError={props.isError}
			onSubmit={onSubmit}
		/>
	);
};

Form.displayName = 'Form';
Form.defaultProps = {};

export default React.memo(Form);
