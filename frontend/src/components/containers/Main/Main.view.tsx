import React from 'react';
import MainNavigation from '../../layout/MainNavigation';
import Intro from '../Main/Intro';
import MModal from '../../ui/MModal';

import classes from './Main.module.scss';
import CategoryFilter from '../CategoryFilter';

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
	isError: string;
	notificaitonData: any;
	showNoti: boolean;
	sortPlayers: any;
	videosSorted: any;
	handleCategoryChange: any;
}

const MainView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return (
		<>
			<MModal show={props.showModal} onCancel={props.onCancel}>
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
			</MModal>
			<section className={classes.container}>
				<MainNavigation />
				<CategoryFilter handleCategoryChange={props.handleCategoryChange} />
				{props.showNoti && (
					<div className={classes.notification}>
						<div className={classes.content}>
							<div className={classes.conttextent}>
								{props.notificaitonData.likeUserName +
									' Liked Your Post ' +
									props.notificaitonData.likedVideoTitle}
							</div>
						</div>
					</div>
				)}

				<select className={classes.sortDropdown} onChange={props.sortPlayers}>
					<option value="Default">Default</option>
					<option value="Alphabetically">Alphabetically</option>
					<option value="MostLiked">MostLiked</option>
				</select>

				{props.isInit && (
					<ul>
						{props.videosSorted.map((video: any) => (
							<Intro
								key={video.id}
								id={video.id}
								title={video.title}
								description={video.description}
								genre={video.genre}
								vidurl={video.vidurl}
								creator={video.creator}
								userliked={video.userliked}
								likeCounter={video.likeCounter}
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
