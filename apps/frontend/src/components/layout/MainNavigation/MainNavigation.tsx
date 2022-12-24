import React from 'react';

import MainNavigationView from './MainNavigation.view';

interface IProps {}

const MainNavigation: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return <MainNavigationView />;
};

MainNavigation.displayName = 'MainNavigation';
MainNavigation.defaultProps = {};

export default React.memo(MainNavigation);
