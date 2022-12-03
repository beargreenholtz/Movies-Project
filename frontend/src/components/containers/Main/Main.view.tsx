import React from 'react';
import MainNavigation from '../../layout/MainNavigation';
import Intro from '../Main/Intro';
import MModal from '../../ui/MModal';

import classes from './Main.module.scss';

interface IProps {
	showModal: boolean;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	onCancel: () => void;
	children?: React.ReactNode;
	onSubmit: (e: React.FormEvent) => void;
	titleRef: any;
	genreRef: any;
	vidurlRef: any;
	descriptionRef: any;
	videos: any;
	isInit: boolean;
	onDeletePlace: any;
}

const MainView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return (
		<>
			<MModal show={props.showModal} onCancel={props.onCancel}>
				<form className={classes.videoForm} onSubmit={props.onSubmit}>
					<label htmlFor="title">Video Name:</label>
					<input type="text" id="title" name="title" ref={props.titleRef} />
					<label htmlFor="genre">genre:</label>
					<input type="text" id="genre" name="genre" ref={props.genreRef} />
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
			</MModal>
			<section className={classes.container}>
				<MainNavigation />

				{props.isInit && (
					<ul>
						{props.videos.map((video: any) => (
							<Intro
								key={video.id}
								id={video.id}
								title={video.title}
								description={video.description}
								genre={video.genre}
								vidurl={video.vidurl}
								creator={video.creator}
								onDelete={props.onDeletePlace}
							/>
						))}
					</ul>
				)}
				<button className={classes.addMovieBtn} type="button" onClick={props.onClick}>
					Add Movie
				</button>
			</section>
		</>
	);
};

MainView.displayName = 'MainView';
MainView.defaultProps = {};

export default React.memo(MainView);
