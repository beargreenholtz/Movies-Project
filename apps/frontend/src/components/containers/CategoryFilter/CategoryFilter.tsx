import React, { useState } from 'react';

import CategoryFilterView from './CategoryFilter.view';

interface IProps {
	handleCategoryChange: (_: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategoryFilter: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return <CategoryFilterView handleCategoryChange={props.handleCategoryChange} />;
};

CategoryFilter.displayName = 'CategoryFilter';
CategoryFilter.defaultProps = {};

export default React.memo(CategoryFilter);
