import React, { MouseEventHandler } from 'react';

import MBackdropView from './MBackdrop.view';

interface IProps {
	onClick: MouseEventHandler<HTMLDivElement>;
}

const MBackdrop: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return <MBackdropView onClick={props.onClick} />;
};

MBackdrop.displayName = 'MBackdrop';
MBackdrop.defaultProps = {};

export default React.memo(MBackdrop);
