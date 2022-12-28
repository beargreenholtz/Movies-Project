import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

import classes from './NavLinks.module.scss';

interface IProps {
	onClick: () => void;
}

const NavLinksView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	const auth = useContext(AuthContext);

	return (
		<ul className={classes.navLinks}>
			{!auth.isLoggedIn && (
				<NavLink to="/login" className={classes.nav}>
					Login
				</NavLink>
			)}
			{!auth.isLoggedIn && (
				<NavLink to="/login/signup" className={classes.nav}>
					SignUp
				</NavLink>
			)}
			{auth.isLoggedIn && (
				<NavLink to="/" className={classes.nav} onClick={props.onClick}>
					Logout
				</NavLink>
			)}
		</ul>
	);
};

NavLinksView.displayName = 'NavLinksView';
NavLinksView.defaultProps = {};

export default React.memo(NavLinksView);
