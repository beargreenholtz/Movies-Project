import React, { type Dispatch, type SetStateAction } from 'react';

import MainNavigation from '../../layout/MainNavigation';
import MModal from '../../ui/MModal';
import CategoryFilter from '../CategoryFilter';
import type { IVideo } from '../../../interfaces/video';
import VidNotification from './Notification';

import Intro from './Intro';
import classes from './Main.module.scss';
import Form from './Form';

interface IProps {
	readonly children?: React.ReactNode;
	readonly videos: IVideo[];
	readonly isInit: boolean;
	readonly isError: string;
	readonly videosSorted: IVideo[] | [];
	readonly showModal: boolean;
	readonly selectedCategory: string | undefined;
	readonly optionEvent: string | undefined;
	readonly setReload: Dispatch<SetStateAction<boolean>>;
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
					selectedCategory={props.selectedCategory}
					optionEvent={props.optionEvent}
					setReload={props.setReload}
				/>
			</MModal>
			<section className={classes.container}>
				<MainNavigation />
				<CategoryFilter handleCategoryChange={props.handleCategoryChange} />
				<VidNotification />

				<select className={classes.sortDropdown} onChange={props.sortPlayers}>
					<option value="Default">Default</option>
					<option value="Alphabetically">Alphabetically</option>
					<option value="MostLiked">MostLiked</option>
				</select>

				{props.isInit && (
					<ul>
						{props.videosSorted.map((video: IVideo) => (
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
