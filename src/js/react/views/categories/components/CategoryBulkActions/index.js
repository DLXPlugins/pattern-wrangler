import { _n, __, sprintf } from '@wordpress/i18n';
import { CheckboxControl } from '@wordpress/components';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import classnames from 'classnames';
const CategoryBulkActions = ( props ) => {
	const { categories } = props;
	const { getValues, setValue, control } = useFormContext();
	const formValues = useWatch( { control } );

	const categoriesSelectedCount = Object.values( getValues( 'categoriesSelected' ) ).filter( ( value ) => value ).length;

	return (
		<div
			className={ classnames( 'dlx-patterns-view-category-bulk-actions', {
				'is-selected': getValues( 'bulkActionSelected' ),
			} ) }
		>
			<Controller
				control={ control }
				name="bulkActionSelected"
				render={ ( { field } ) => (
					<>
						<CheckboxControl
							checked={ field.value }
							onChange={ ( boolValue ) => {
								categories.forEach( ( category ) => {
									setValue( `categoriesSelected[${ category.slug }]`, boolValue );
								} );
								field.onChange( boolValue );
							} }
							label={
								/* translators: %d: number of categories selected */
								sprintf( _n( '%d Category', '%d Categories', categoriesSelectedCount > 0 ? categoriesSelectedCount : categories.length, 'pattern-wrangler' ), categoriesSelectedCount > 0 ? categoriesSelectedCount : categories.length )
							}
							indeterminate={ categoriesSelectedCount > 0 && categoriesSelectedCount < categories.length }
						/>
					</>
				) }
			/>
			<div className="dlx-patterns-view-category-card__header">
				{ __( 'Category Bulk Actions', 'pattern-wrangler' ) }
			</div>
		</div>
	);
};
export default CategoryBulkActions;
