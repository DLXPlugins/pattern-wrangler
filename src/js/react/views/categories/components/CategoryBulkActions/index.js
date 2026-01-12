import { _n, __, sprintf } from '@wordpress/i18n';
import { CheckboxControl, Button } from '@wordpress/components';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import classnames from 'classnames';
const CategoryBulkActions = ( props ) => {
	const { categories, actions } = props;
	const { getValues, setValue, control } = useFormContext();
	const formValues = useWatch( { control } );

	const categoriesSelectedCount = categories.filter( ( category ) =>
		getValues( `categoriesSelected[${ category.slug }]` )
	).length;

	// Get the categories that are selected.
	const selectedCategories = categories.filter( ( category ) =>
		getValues( `categoriesSelected[${ category.slug }]` )
	);

	const getActionButtons = () => {
		return (
			<>
				<div className="dlx-patterns-view-category-bulk-actions__action-buttons">
					{
						actions.map( ( action ) => {
							// If even one category is eligible for the action, show the button. We'll need to loop through the categories and check if any are eligible.
							const isEligible = selectedCategories.some( ( category ) =>
								action.isEligible( category )
							);
							if ( ! isEligible ) {
								return null;
							}
							return (
								<Button
									key={ action.id }
									action={ action }
									icon={ action.icon }
									label={ action.getLabel( selectedCategories ) }
									isDestructive={ action.isDestructive }
									onClick={ () => action.callback( selectedCategories ) }
								/>
							);
						} )
					}
				</div>
			</>
		);
	};

	return (
		<div
			className={ classnames(
				'dlx-patterns-view-category-bulk-actions dataviews-bulk-actions-footer__container',
				{
					'is-selected': getValues( 'bulkActionSelected' ),
				}
			) }
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
								sprintf(
									/* translators: %d: number of categories selected */
									_n(
										'%d Category',
										'%d Categories',
										categoriesSelectedCount > 0
											? categoriesSelectedCount
											: categories.length,
										'pattern-wrangler'
									),
									categoriesSelectedCount > 0
										? categoriesSelectedCount
										: categories.length
								)
							}
							indeterminate={
								categoriesSelectedCount > 0 &&
								categoriesSelectedCount < categories.length
							}
						/>
					</>
				) }
			/>
			{ categoriesSelectedCount > 0 && <>{ getActionButtons() }</> }
		</div>
	);
};
export default CategoryBulkActions;
