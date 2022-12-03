import React, { MouseEventHandler, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import slideTransition from './transition/slide.module.scss';
import MBackdrop from '../MBackdrop';

import classes from './MModal.module.scss';

interface IOProps {
	className?: string;
	headerClass?: string;
	header?: string;
	contentClass?: string;
	footerClass?: string;
	footer?: string;
	children?: React.ReactNode;
}

const ModalOverlay: React.FC<IOProps> = (props: React.PropsWithChildren<IOProps>) => {
	const modalHook = document.getElementById('modal-hook') as Element;

	const content = (
		<div className={`${classes.modal} ${props.className}`}>
			<header className={`${classes.modalHeader} ${props.headerClass}`}>
				<h2>{props.header}</h2>
			</header>
			<div className={`${classes.modalContent} ${props.contentClass}`}>{props.children}</div>
		</div>
	);
	return ReactDOM.createPortal(content, modalHook);
};

interface IProps {
	show: boolean;
	onCancel: MouseEventHandler<HTMLDivElement>;
	footerClasss?: string;
	footers?: string;
	className?: string;
	headerClass?: string;
	contentClass?: string;
}

const MModalView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return (
		<>
			{props.show && <MBackdrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				mountOnEnter
				unmountOnExit
				timeout={200}
				classNames={slideTransition}
			>
				<ModalOverlay {...props} />
			</CSSTransition>
		</>
	);
};

MModalView.displayName = 'MModalView';
MModalView.defaultProps = {};

export default React.memo(MModalView);
