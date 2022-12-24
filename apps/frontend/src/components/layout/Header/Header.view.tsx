import React from 'react';

import classes from './Header.module.scss';

interface IProps {}

const HeaderView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return <header className={classes.mainHeader}>{props.children}</header>;
};

HeaderView.displayName = 'HeaderView';
HeaderView.defaultProps = {};

export default React.memo(HeaderView);
