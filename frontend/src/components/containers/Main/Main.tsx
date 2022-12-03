import React, { useState, useContext, useRef, useEffect } from 'react';

import axios from 'axios';

import { AuthContext } from '../../../context/authContext';
import MainView from './Main.view';

interface IProps {}

const Main: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	const auth = useContext(AuthContext);
	const [videos, setVideos] = useState<[]>();
	const [isInit, setIsInit] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [isError, setIsError] = useState<string>('');

	const titleRef = useRef<HTMLInputElement | null>(null);
	const genreRef = useRef<HTMLInputElement | null>(null);
	const vidurlRef = useRef<HTMLInputElement | null>(null);
	const descriptionRef = useRef<HTMLInputElement | null>(null);

	const openModalHandler = () => {
		setShowModal(true);
	};
	const closeModalHandler = () => {
		setShowModal(false);
		setIsError('');
	};

	const onSubmit = async (e: React.FormEvent) => {
		const title = titleRef.current?.value;
		const genre = genreRef.current?.value;
		const vidurl = vidurlRef.current?.value;
		const description = descriptionRef.current?.value;
		e.preventDefault();
		const customConfig = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + auth.token,
			},
		};
		let video = JSON.stringify({ title, description, genre, vidurl, creator: auth.userId });
		console.log(video);

		try {
			await axios.post(`http://localhost:5000/video/addVid`, video, customConfig);
			closeModalHandler();
			video = '';
		} catch (err) {
			if (!auth.token) {
				setIsError('Login to create a video');
			} else {
				setIsError('Invalid Inputs');
			}
		}
	};

	useEffect(() => {
		try {
			axios.get(`http://localhost:5000/video/fetchAllVideos`).then((res) => {
				setVideos(res.data.video);
				setIsInit(true);
			});
		} catch (error) {
			console.log(error);
		}
	}, [videos]);

	// const onDelete = () => {
	// 	setVideos(videos?.filter());
	// };

	const placeDeletedHandler = (deletedPlaceId: string) => {
		setVideos((prevPlaces: any) =>
			prevPlaces?.filter((place: { id: string }) => place.id !== deletedPlaceId),
		);
	};

	return (
		<MainView
			titleRef={titleRef}
			genreRef={genreRef}
			vidurlRef={vidurlRef}
			descriptionRef={descriptionRef}
			showModal={showModal}
			videos={videos}
			isInit={isInit}
			isError={isError}
			onCancel={closeModalHandler}
			onClick={openModalHandler}
			onSubmit={onSubmit}
			onDeletePlace={placeDeletedHandler}
		/>
	);
};

Main.displayName = 'Main';
Main.defaultProps = {};

export default React.memo(Main);
