import React from 'react';
import Header from '../Header';
import NavLinks from '../NavLinks';

import tvSvg from '../../../util/television.svg';

import classes from './MainNavigation.module.scss';
import { NavLink } from 'react-router-dom';

interface IProps {}

const MainNavigationView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return (
		<Header>
			<div className={classes.logoAndText}>
				<img src={tvSvg} alt="TV" className={classes.logo} />
				<NavLink to="/" className={classes.logoNav}>
					<p className={classes.mainHeaderTitles}>MovieNow</p>
				</NavLink>
			</div>
			<div className={classes.signindiv}>
				<NavLinks />
			</div>
		</Header>
	);
};

MainNavigationView.displayName = 'MainNavigationView';
MainNavigationView.defaultProps = {};

export default React.memo(MainNavigationView);
