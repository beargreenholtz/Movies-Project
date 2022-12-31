import React from 'react';

import classes from './MCard.module.scss';

interface IProps {
	readonly className?: string;
	readonly children: React.ReactNode;
}

const MCardView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
};

MCardView.displayName = 'MCardView';
MCardView.defaultProps = {};

export default React.memo(MCardView);
