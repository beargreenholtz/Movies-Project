import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../context/authContext';

import IntroView from './Intro.view';

interface IProps {
	title: string;
	description: string;
	genre: string;
	vidurl: string;
	creator: string;
	userliked: [_: string | null];
	likeCounter: number;
	id: string;
	onDelete: (_: string) => void;
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
	const info = {
		userId: userId,
	};
	const onLike = async () => {
		setIsDisabled(true);
		try {
			await axios.post(`http://localhost:5000/video/addLike/${props.id}`, info).then((res) => {
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
			console.log(err);
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

	return (
		<IntroView
			title={props.title}
			description={props.description}
			genre={props.genre}
			vidurl={props.vidurl}
			creator={props.creator}
			id={props.id}
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
function forceUpdate() {
	throw new Error('Function not implemented.');
}
