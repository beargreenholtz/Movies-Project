import React, { useContext } from 'react';

import { AuthContext } from '../../../context/authContext';

import NavLinksView from './NavLinks.view';

interface IProps {}

const NavLinks: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	const auth = useContext(AuthContext);

	const onClick = () => {
		auth.logout();
	};
	return <NavLinksView onClick={onClick} />;
};

NavLinks.displayName = 'NavLinks';
NavLinks.defaultProps = {};

export default React.memo(NavLinks);
