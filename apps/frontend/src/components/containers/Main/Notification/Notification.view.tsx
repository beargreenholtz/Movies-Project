import React from 'react';

import type { INotification } from '../../../../interfaces/notification';
import classes from './Notification.module.scss';

interface IProps {
	readonly showNoti: boolean;
	readonly notificaitonData: INotification | null;
}

const VidNotification: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	if (!props.showNoti) {
		return null;
	}

	return (
		props.showNoti && (
			<div className={classes.notification}>
				<div className={classes.content}>
					<div className={classes.conttextent}>
						{props.notificaitonData?.likeUserName +
							' Liked Your Post ' +
							props.notificaitonData?.likedVideoTitle}
					</div>
				</div>
			</div>
		)
	);
};

VidNotification.displayName = 'VidNotificationView';
VidNotification.defaultProps = {};

export default React.memo(VidNotification);
