import React from 'react';

import classes from './CategoryFilter.module.scss';

interface IProps {
	handleCategoryChange: any;
}

const CategoryFilterView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return (
		<div className={classes.filterContainer}>
			<div>Filter by Category:</div>
			<div>
				<select
					name="category-list"
					className={classes.categoryList}
					onChange={props.handleCategoryChange}
				>
					<option value="All">All</option>
					<option value="React">React</option>
					<option value="NodeJs">NodeJs</option>
					<option value="CSS 3">CSS 3</option>
					<option value="HTML 5">HTML 5</option>
				</select>
			</div>
		</div>
	);
};

CategoryFilterView.displayName = 'CategoryFilterView';
CategoryFilterView.defaultProps = {};

export default React.memo(CategoryFilterView);
