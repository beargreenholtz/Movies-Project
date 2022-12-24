import React from 'react';

import MCardView from './MCard.view';

interface IProps {
	className?: string;
	children: React.ReactNode;
}

const MCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return <MCardView className={props.className}>{props.children}</MCardView>;
};

MCard.displayName = 'MCard';
MCard.defaultProps = {};

export default React.memo(MCard);
