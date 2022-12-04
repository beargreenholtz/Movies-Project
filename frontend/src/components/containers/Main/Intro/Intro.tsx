import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react';
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
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [isDisabled, setDisabled] = useState<boolean>(false);
	const auth = useContext(AuthContext);

	const buttonRef = useRef(null);

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
		setDisabled(true);
		setTimeout(async () => {
			try {
				await axios.post(`http://localhost:5000/video/addLike/${props.id}`, info).then((res) => {
					console.log(res);
					console.log(res.data);
					if (userId) {
						setIsLiked(true);
					}
					if (isLiked) {
						setIsLiked(false);
					}
				});
			} catch (err) {
				console.log(err);
			}
			setDisabled(false);
		}, 400);
	};

	useEffect(() => {
		if (props.userliked.includes(userId)) {
			setIsLiked(true);
		}
	}, []);

	return (
		<IntroView
			title={props.title}
			description={props.description}
			genre={props.genre}
			vidurl={props.vidurl}
			creator={props.creator}
			id={props.id}
			likeCounter={props.likeCounter}
			showVidModal={showVidModal}
			userId={auth.userId}
			isLiked={isLiked}
			isDisabled={isDisabled}
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
