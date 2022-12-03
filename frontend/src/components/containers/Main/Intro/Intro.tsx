import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/authContext';

import IntroView from './Intro.view';

interface IProps {
	title: string;
	description: string;
	genre: string;
	vidurl: string;
	creator: string;
	id: string;
	onDelete: (_: string) => void;
}

const Intro: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	const [showVidModal, setShowVidModal] = useState<boolean>(false);
	const auth = useContext(AuthContext);

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

	return (
		<IntroView
			title={props.title}
			description={props.description}
			genre={props.genre}
			vidurl={props.vidurl}
			creator={props.creator}
			id={props.id}
			showVidModal={showVidModal}
			onClick={showVid}
			onCancel={closeVid}
			onDelete={onDelete}
		/>
	);
};

Intro.displayName = 'Intro';
Intro.defaultProps = {};

export default React.memo(Intro);
