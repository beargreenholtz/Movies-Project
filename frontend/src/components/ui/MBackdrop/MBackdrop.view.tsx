import React, { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';

import classes from './MBackdrop.module.scss';

interface IProps {
	onClick: MouseEventHandler<HTMLDivElement>;
}

const MBackdropView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	const backdropHook = document.getElementById('backdrop-hook') as Element;

	return ReactDOM.createPortal(<div className={classes.backdrop} onClick={props.onClick} />, backdropHook);
};

MBackdropView.displayName = 'MBackdropView';
MBackdropView.defaultProps = {};

export default React.memo(MBackdropView);
