import React from 'react';
import MModal from '../../../ui/MModal';

import classes from './Intro.module.scss';

interface IProps {
	readonly title: string;
	readonly description: string;
	readonly genre: string;
	readonly vidurl: string;
	readonly creator: string;
	readonly userId: string | null;
	readonly showVidModal: boolean;
	readonly id: string;
	readonly onClick: () => void | React.MouseEventHandler<HTMLButtonElement>;
	readonly onCancel: () => void;
	readonly onLike: () => void;
	readonly isLiked: boolean | null;
	readonly isLogged: boolean | null;
	readonly onDelete: () => void;
	readonly likeCounter: number;
	readonly isDisabled: boolean;
	readonly isSelfPost: boolean | null;
	readonly youtubeId: string | null;
}

const IntroView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return (
		<li className={classes.container}>
			<div className={classes.movieCard} id="bright">
				{props.isLogged && !props.isSelfPost && (
					<div className={classes.placement}>
						<button
							type="button"
							className={
								props.isLiked ? `${classes.heart}  ${classes.isActive}` : classes.heart
							}
							disabled={props.isDisabled}
							onClick={props.onLike}
						/>
						<span className={classes.likeCounter}>{props.likeCounter}</span>
					</div>
				)}
				<div className={classes.infoSection}>
					<div className={classes.movieHeader}>
						<img
							className={classes.locandina}
							src={`https://img.youtube.com/vi/${props.youtubeId}/maxresdefault.jpg`}
							alt="movie"
						/>
						<h1>{props.title}</h1>
						<span className={classes.minutes}>Genre:</span>
						<p className={classes.type}>{props.genre}</p>
					</div>
					<div className={classes.movieDesc}>
						<p className={classes.text}>{props.description}</p>
					</div>
				</div>
				<img
					className={`${classes.blurBack} ${classes.brightBack}`}
					src={`https://img.youtube.com/vi/${props.youtubeId}/maxresdefault.jpg`}
					alt="movie"
				/>
				<button type="button" className={classes.watchVidBtn} onClick={props.onClick}>
					click here to watch
				</button>
				{props.creator === props.userId && (
					<button type="button" className={classes.deleteBtn} onClick={props.onDelete}>
						Delete
					</button>
				)}
			</div>

			{props.showVidModal && (
				<MModal show={props.showVidModal} onCancel={props.onCancel}>
					<div className={classes.center}>
						<iframe
							width="560"
							height="315"
							src={`https://www.youtube.com/embed/${props.youtubeId}`}
							title="YouTube video player"
							frameBorder="0"
							allowFullScreen
						/>
					</div>
				</MModal>
			)}
		</li>
	);
};

IntroView.displayName = 'IntroView';
IntroView.defaultProps = {};

export default React.memo(IntroView);
