// eslint-disable-next-line max-lines

import React, { useState, useContext, useEffect, useMemo } from 'react';

import { io } from 'socket.io-client';

import axios from 'axios';

import { AuthContext } from '../../../context/authContext';

import MainView from './Main.view';

interface IProps {}

interface videoArr {
	readonly _id: string;
	readonly creator: string;
	readonly description: string;
	readonly genre: string;
	readonly id: string;
	readonly likeCounter: number;
	readonly title: string;
	readonly userliked: [_: string | null];
	readonly vidurl: string;
}
interface notification {
	likeUserName: string;
	likedVideoTitle: string;
	vidCreator: string;
}
const socket = io('http://localhost:5000');

const Main: React.FC<IProps> = () => {
	const auth = useContext(AuthContext);

	const [showModal, setShowModal] = useState<boolean>(false);
	const [isError, setIsError] = useState<string>('');
	const [videos, setVideos] = useState<videoArr[]>([]);
	const [isInit, setIsInit] = useState<boolean>(false);
	const [notificationData, setNotificationData] = useState<notification | null>(null);
	const [showNoti, setShowNoti] = useState<boolean>(false);
	const [videosSorted, setVideosSorted] = useState<videoArr[]>([]);
	const [oprtionEvent, setOptionEvent] = useState<string | undefined>();
	const [sortEvent, setSortEvent] = useState<React.ChangeEvent<HTMLSelectElement> | undefined>();
	const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
	const [reload, setReload] = useState<boolean>(false);

	const openModalHandler = () => {
		setShowModal(true);
	};

	const closeModalHandler = () => {
		setShowModal(false);
		setIsError('');
	};

	const sortPlayers = (selectEvent: React.ChangeEvent<HTMLSelectElement>) => {
		const options: Record<string, videoArr[]> = {
			Alphabetically: [...(videosSorted || [])].sort((a, b) =>
				a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
			),
			MostLiked: [...(videosSorted || [])].sort((a, b) => b.likeCounter - a.likeCounter),
			Default: videos,
		};

		setSortEvent(selectEvent);
		setOptionEvent(selectEvent.target.value);
		setVideosSorted(options[selectEvent.target.value]);
	};

	const fetchAllVideos = () => {
		try {
			axios.get('http://localhost:5000/video/fetchAllVideos').then((res) => {
				setIsInit(true);
				setVideos(res.data.video);

				if (videosSorted.length === 0) {
					setVideosSorted(res.data.video);
				}

				if (videosSorted.length > 0) {
					setVideosSorted(res.data.video);
				}

				if (oprtionEvent !== undefined && sortEvent !== undefined) {
					sortPlayers(sortEvent);
				}
			});
		} catch (error) {}
	};

	useEffect(() => {
		if (!isInit) {
			fetchAllVideos();
		}

		fetchAllVideos();
	}, [reload]);

	useEffect(() => {
		const eventListener = (data: notification) => {
			setNotificationData(data);

			if (auth.userId === data.vidCreator) {
				setShowNoti(true);
			}

			setTimeout(() => {
				setShowNoti(false);
			}, 10000);
		};

		socket.on('likes', eventListener);

		return () => {
			socket.off('likes', eventListener);
		};
	}, [socket]);

	const placeDeletedHandler = (deletedPlaceId: string) => {
		setVideos((prevPlaces: videoArr[]) =>
			prevPlaces?.filter((place: { id: string }) => place.id !== deletedPlaceId),
		);

		if (selectedCategory === undefined && oprtionEvent === undefined) {
			setReload(!reload);
		} else {
			window.location.reload();
		}
	};

	const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(event.target.value);
	};

	const getFilteredList = () => {
		if (!selectedCategory) {
			return videos;
		}

		return videos.filter((item: videoArr) => item.genre === selectedCategory);
	};

	const filteredListCategory = useMemo(getFilteredList, [selectedCategory, videosSorted]);

	useEffect(() => {
		if (selectedCategory !== 'All') {
			setVideosSorted(filteredListCategory);

			if (filteredListCategory.length === 0) {
				setVideosSorted([...videos]);
			}
		}

		if (selectedCategory === 'All') {
			setVideosSorted([...videos]);
		}
	}, [selectedCategory]);

	return (
		<MainView
			videos={videos}
			isInit={isInit}
			notificaitonData={notificationData}
			showNoti={showNoti}
			videosSorted={videosSorted}
			isError={isError}
			showModal={showModal}
			setIsError={setIsError}
			handleCategoryChange={handleCategoryChange}
			sortPlayers={sortPlayers}
			openModalHandler={openModalHandler}
			onDeletePlace={placeDeletedHandler}
			onClick={openModalHandler}
			onCancel={closeModalHandler}
		/>
	);
};

Main.displayName = 'Main';
Main.defaultProps = {};

export default React.memo(Main);
