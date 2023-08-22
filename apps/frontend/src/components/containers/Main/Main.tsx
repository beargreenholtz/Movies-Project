// eslint-disable-next-line max-lines

import React, { useState, useEffect, useMemo } from 'react';

import axios from 'axios';

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

const Main: React.FC<IProps> = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [isError, setIsError] = useState<string>('');
	const [videos, setVideos] = useState<videoArr[]>([]);
	const [isInit, setIsInit] = useState<boolean>(false);
	const [videosSorted, setVideosSorted] = useState<videoArr[]>([]);
	const [optionEvent, setOptionEvent] = useState<string | undefined>();
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

				if (optionEvent !== undefined && sortEvent !== undefined) {
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

	const placeDeletedHandler = (deletedPlaceId: string) => {
		setVideos((prevPlaces: videoArr[]) =>
			prevPlaces?.filter((place: { id: string }) => place.id !== deletedPlaceId),
		);

		if (selectedCategory === undefined && optionEvent === undefined) {
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
			videosSorted={videosSorted}
			isError={isError}
			showModal={showModal}
			selectedCategory={selectedCategory}
			optionEvent={optionEvent}
			setIsError={setIsError}
			handleCategoryChange={handleCategoryChange}
			sortPlayers={sortPlayers}
			openModalHandler={openModalHandler}
			setReload={setReload}
			onDeletePlace={placeDeletedHandler}
			onClick={openModalHandler}
			onCancel={closeModalHandler}
		/>
	);
};

Main.displayName = 'Main';
Main.defaultProps = {};

export default React.memo(Main);
