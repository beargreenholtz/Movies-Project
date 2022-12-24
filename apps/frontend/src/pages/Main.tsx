import React from 'react';

import Main from '../components/containers/Main';

interface IProps {}

const MainPage: React.FC<IProps> = () => {
	return <Main />;
};

MainPage.displayName = 'MainPage';
MainPage.defaultProps = {};

export default MainPage;
