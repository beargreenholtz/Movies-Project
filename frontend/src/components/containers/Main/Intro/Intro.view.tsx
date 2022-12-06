import React from 'react';
import MModal from '../../../ui/MModal';

import classes from './Intro.module.scss';

interface IProps {
	title: string;
	description: string;
	genre: string;
	vidurl: string;
	creator: string;
	userId: string | null;
	showVidModal: boolean;
	id: string;
	onClick: () => void | React.MouseEventHandler<HTMLButtonElement>;
	onCancel: () => void;
	onLike: any;
	isLiked: boolean | null;
	isLogged: boolean | null;
	onDelete: any;
	likeCounter: number;
	isDisabled: boolean;
	isSelfPost: boolean | null;
}

const IntroView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	let youtubeId;
	var url = props.vidurl;
	var videoid = url.match(
		/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/,
	);
	if (videoid != null) {
		youtubeId = videoid[1];
	} else {
	}

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
							src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
							alt="movie"
						/>
						<h1>{props.title}</h1>
						<h4>Youtube Video</h4>
						<span className={classes.minutes}>Genre:</span>
						<p className={classes.type}>{props.genre}</p>
					</div>
					<div className={classes.movieDesc}>
						<p className={classes.text}>{props.description}</p>
					</div>
				</div>
				<img
					className={`${classes.blurBack} ${classes.brightBack}`}
					src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
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
							src={`https://www.youtube.com/embed/${youtubeId}`}
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
