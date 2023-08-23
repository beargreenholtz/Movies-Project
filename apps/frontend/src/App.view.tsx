import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from './App.router';

interface IProps {}

const AppView: React.FC<IProps> = () => (
	<BrowserRouter>
		<AppRouter />
	</BrowserRouter>
);

AppView.displayName = 'AppView';
AppView.defaultProps = {};

export default React.memo(AppView);
