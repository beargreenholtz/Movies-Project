import React, { type Dispatch, type SetStateAction } from 'react';

import MainNavigation from '../../layout/MainNavigation';
import MModal from '../../ui/MModal';

import CategoryFilter from '../CategoryFilter';
import Intro from './Intro';
import classes from './Main.module.scss';
import Form from './Form';

interface videoArr {
	_id: string;
	creator: string;
	description: string;
	genre: string;
	id: string;
	likeCounter: number;
	title: string;
	userliked: [_: string | null];
	vidurl: string;
}

interface notification {
	likeUserName: string;
	likedVideoTitle: string;
	vidCreator: string;
}

interface IProps {
	readonly children?: React.ReactNode;
	readonly videos: videoArr[];
	readonly isInit: boolean;
	readonly isError: string;
	readonly notificaitonData: notification | null;
	readonly showNoti: boolean;
	readonly videosSorted: videoArr[] | [];
	readonly showModal: boolean;
	readonly setIsError: Dispatch<SetStateAction<string>>;
	readonly onClick: React.MouseEventHandler<HTMLButtonElement>;
	readonly sortPlayers: (_: React.ChangeEvent<HTMLSelectElement>) => void;
	readonly onDeletePlace: (_: string) => void;
	readonly handleCategoryChange: (_: React.ChangeEvent<HTMLSelectElement>) => void;
	readonly openModalHandler: () => void;
	readonly onCancel: () => void;
}

const MainView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return (
		<>
			<MModal show={props.showModal} onCancel={props.onCancel}>
				<Form
					closeModalHandler={props.onCancel}
					setIsError={props.setIsError}
					isError={props.isError}
				/>
			</MModal>
			<section className={classes.container}>
				<MainNavigation />
				<CategoryFilter handleCategoryChange={props.handleCategoryChange} />
				{props.showNoti && (
					<div className={classes.notification}>
						<div className={classes.content}>
							<div className={classes.conttextent}>
								{props.notificaitonData?.likeUserName +
									' Liked Your Post ' +
									props.notificaitonData?.likedVideoTitle}
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
						{props.videosSorted.map((video: videoArr) => (
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

				<button className={classes.addMovieBtn} type="button" onClick={props.openModalHandler}>
					Add Movie
				</button>
			</section>
		</>
	);
};

MainView.displayName = 'MainView';
MainView.defaultProps = {};

export default React.memo(MainView);
