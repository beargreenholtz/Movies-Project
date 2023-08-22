import React, { useContext, useEffect, useState } from 'react';

import { io } from 'socket.io-client';
import { AuthContext } from '../../../../context/authContext';

import type { INotification } from '../../../../interfaces/notification';
import NotificationView from './Notification.view';

const socket = io('http://localhost:5000');

interface IProps {}

const VidNotification: React.FC<IProps> = () => {
	const auth = useContext(AuthContext);

	const [notificationData, setNotificationData] = useState<INotification | null>(null);
	const [showNoti, setShowNoti] = useState<boolean>(false);

	useEffect(() => {
		const eventListener = (data: INotification) => {
			if (auth.userId === data.vidCreator) {
				setNotificationData(data);
				setShowNoti(true);
			}

			setTimeout(() => {
				setShowNoti(false);
				setNotificationData(null);
			}, 10000);
		};

		socket.on('likes', eventListener);

		return () => {
			socket.off('likes', eventListener);
		};
	}, [socket]);

	return <NotificationView notificaitonData={notificationData} showNoti={showNoti} />;
};

VidNotification.displayName = 'Notification';
VidNotification.defaultProps = {};

export default React.memo(VidNotification);
