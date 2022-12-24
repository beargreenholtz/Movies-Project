import React from 'react';

import HeaderView from './Header.view';

interface IProps {}

const Header: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return <HeaderView>{props.children}</HeaderView>;
};

Header.displayName = 'Header';
Header.defaultProps = {};

export default React.memo(Header);
