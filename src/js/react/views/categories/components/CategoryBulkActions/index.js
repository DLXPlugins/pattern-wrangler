import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { CheckboxControl } from '@wordpress/components';
import { useFormContext } from 'react-hook-form';
import classnames from 'classnames';
const CategoryBulkActions = ( props ) => {
	const { categories } = props;
	const { getValues } = useFormContext();
	const [ isSelected, setIsSelected ] = useState( false );

	console.log( categories );
	return (
		<div
			className={
				classnames( 'dlx-patterns-view-category-bulk-actions', {
					'is-selected': isSelected,
				} )
			}
		>
			<CheckboxControl
				checked={ isSelected }
				onChange={ ( boolValue ) => {
					setIsSelected( boolValue );
				} }
				label={ __( 'Select all', 'pattern-wrangler' ) }
			/>
			<div className="dlx-patterns-view-category-card__header">
				{ __( 'Category Bulk Actions', 'pattern-wrangler' ) }
			</div>
		</div>
	);
};
export default CategoryBulkActions;
