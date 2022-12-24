import React, { MouseEventHandler } from 'react';

import MModalView from './MModal.view';

interface IProps {
	show: boolean;
	onCancel: MouseEventHandler<HTMLDivElement>;
	footerClasss?: string;
	footers?: string;
	className?: string;
	headerClass?: string;
	contentClass?: string;
	children?: React.ReactNode;
}

const MModal: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return (
		<MModalView
			// onCancel={props.onCancel}
			// show={props.show}
			// footerClasss={props.footerClasss}
			// footers={props.footers}
			{...props}
		>
			{props.children}
		</MModalView>
	);
};

MModal.displayName = 'MModal';
MModal.defaultProps = {};

export default React.memo(MModal);
