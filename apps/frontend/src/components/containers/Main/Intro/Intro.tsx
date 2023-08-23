import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../context/authContext';

import IntroView from './Intro.view';

interface IProps {
	readonly title: string;
	readonly description: string;
	readonly genre: string;
	readonly vidurl: string;
	readonly creator: string;
	readonly userliked: [_: string | null];
	readonly likeCounter: number;
	readonly id: string;
	readonly onDelete: (_: string) => void;
}

const Intro: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	const [showVidModal, setShowVidModal] = useState<boolean>(false);
	const [isLiked, setIsLiked] = useState<boolean | null>(null);
	const [isLogged, setisLogged] = useState<boolean | null>(null);
	const [isSelfPost, setIsSelfPost] = useState<boolean | null>(null);
	const [userUsedLike, setUserUsedLike] = useState<boolean | null>(null);

	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const auth = useContext(AuthContext);
	const [likeCounterState, setLikeCounterState] = useState<number>(props.likeCounter);

	const showVid = () => {
		setShowVidModal(true);
	};

	const closeVid = () => {
		setShowVidModal(false);
	};

	const customConfig = {
		headers: {
			Authorization: 'Bearer ' + auth.token,
		},
	};

	const onDelete = async () => {
		try {
			await axios.delete(`http://localhost:5000/video/${props.id}`, customConfig);
			props.onDelete(props.id);
		} catch (err) {}
	};

	const userId = auth.userId;

	const onLike = async () => {
		setIsDisabled(true);

		try {
			await axios
				.post(`http://localhost:5000/video/addLike/${props.id}`, { userId: userId }, customConfig)
				.then(() => {
					if (userUsedLike) {
						setLikeCounterState(() => likeCounterState - 1);
						setUserUsedLike(false);
						setIsLiked(() => false);
					} else if (!userUsedLike) {
						setLikeCounterState(() => likeCounterState + 1);
						setUserUsedLike(true);
						setIsLiked(() => true);
					}
				});
		} catch (err) {
			setIsLiked((prev) => prev);
		}

		setIsDisabled(false);
	};

	useEffect(() => {
		if (userId) {
			setisLogged(true);
		}

		if (!userId) {
			setisLogged(false);
		}

		if (props.userliked.includes(userId)) {
			setIsLiked(true);
			setUserUsedLike(true);
		}
	}, []);

	useEffect(() => {
		if (props.creator === userId) {
			setIsSelfPost(true);
		} else {
			setIsSelfPost(false);
		}
	}, [likeCounterState]);

	let youtubeId;
	const url = props.vidurl;

	const videoid = url.match(
		/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/,
	);

	if (videoid !== null) {
		youtubeId = videoid[1];
	} else {
		youtubeId = 'Rh3tobg7hEo';
	}

	return (
		<IntroView
			title={props.title}
			description={props.description}
			genre={props.genre}
			vidurl={props.vidurl}
			creator={props.creator}
			id={props.id}
			youtubeId={youtubeId}
			likeCounter={likeCounterState}
			showVidModal={showVidModal}
			userId={auth.userId}
			isLiked={isLiked}
			isLogged={isLogged}
			isDisabled={isDisabled}
			isSelfPost={isSelfPost}
			onClick={showVid}
			onCancel={closeVid}
			onDelete={onDelete}
			onLike={onLike}
		/>
	);
};

Intro.displayName = 'Intro';
Intro.defaultProps = {};

export default React.memo(Intro);
