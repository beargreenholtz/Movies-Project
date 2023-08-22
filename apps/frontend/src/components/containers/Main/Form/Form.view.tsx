import React from 'react';

import classes from './Form.module.scss';

interface IProps {
	readonly titleRef: React.LegacyRef<HTMLInputElement> | null;
	readonly genreRef: React.LegacyRef<HTMLSelectElement> | null;
	readonly vidurlRef: React.LegacyRef<HTMLInputElement> | null;
	readonly descriptionRef: React.LegacyRef<HTMLTextAreaElement> | null;
	readonly isError: string;
	readonly onSubmit: (e: React.FormEvent) => void;
}

const FormView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return (
		<form className={classes.videoForm} onSubmit={props.onSubmit}>
			{props.isError && <span className={classes.error}>{props.isError}</span>}
			<label htmlFor="title">Video Name:</label>
			<input type="text" id="title" name="title" ref={props.titleRef} />

			<label htmlFor="genre">Genre:</label>

			<select name="genre" id="genre" ref={props.genreRef}>
				<option value="All">Other</option>
				<option value="React">React</option>
				<option value="NodeJs">NodeJs</option>
				<option value="CSS 3">CSS 3</option>
				<option value="HTML 5">HTML 5</option>
			</select>

			<label htmlFor="vidurl">Video Url:</label>
			<input type="text" id="vidurl" name="vidurl" ref={props.vidurlRef} />
			<label htmlFor="description">Description:</label>
			<textarea
				id="description"
				name="description"
				className={classes.description}
				ref={props.descriptionRef}
			/>
			<button type="submit" className={classes.addMovieBtn}>
				Add Video
			</button>
		</form>
	);
};

FormView.displayName = 'FormView';
FormView.defaultProps = {};

export default React.memo(FormView);
