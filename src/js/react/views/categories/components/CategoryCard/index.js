import { __, _n } from '@wordpress/i18n';
import { AlertCircle, ArrowRight, Edit, Eye, Trash2, Ban } from 'lucide-react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { Button, CheckboxControl } from '@wordpress/components';
import classnames from 'classnames';
const CategoryCard = ( props ) => {
	const { category } = props;
	const { control, getValues } = useFormContext();
	const formValues = useWatch( { control } ); // needed for re-rendering when the form values change.
	/**
	 * Get the category type.
	 *
	 * @return {string} The category type and count.
	 */
	const getCategoryType = () => {
		let string = __( 'Registered', 'pattern-wrangler' );
		if ( ! category.registered ) {
			string = __( 'Local', 'pattern-wrangler' );
		}
		if ( category.count === 0 ) {
			string += ' ' + '(' + __( 'Empty', 'pattern-wrangler' ) + ')';
		} else {
			string +=
				' ' +
				'(' +
				category.count +
				' ' +
				_n( 'Pattern', 'Patterns', category.count, 'pattern-wrangler' ) +
				')';
		}
		return string;
	};

	/**
	 * Get the category enabled status.
	 *
	 * @return {string} The category enabled status.
	 */
	const getCategoryEnabledStatus = () => {
		if ( ! category.enabled ) {
			return (
				<div className="dlx-patterns-view-category-card__enabled-status">
					<AlertCircle className="dlx-patterns-view-category-card__enabled-status-icon" />
					{ __( 'Disabled', 'pattern-wrangler' ) }
				</div>
			)
		}
		return null;
	};

	const getCategoryActions = () => {
		return (
			<div className="dlx-patterns-view-category-card__actions">
				{
					! category.registered && (
						<Button
							variant="tertiary"
							isDestructive={ true }
							icon={ <Trash2 /> }
							className="dlx-patterns-view-category-card__action-button invisible-until-hover"
							onClick={ () => {
								props.onDeleteCategory( [ category ] );
							} }
						>
							{ __( 'Delete Category', 'pattern-wrangler' ) }
						</Button>
					)
				}
				{
					category.registered && category.enabled && (
						<Button
							variant="tertiary"
							isDestructive={ true }
							icon={ <Ban /> }
							className="dlx-patterns-view-category-card__action-button invisible-until-hover"
							onClick={ () => {
								props.onDisableCategory( [ category ] );
							} }
						>
							{ __( 'Disable Category', 'pattern-wrangler' ) }
						</Button>
					)
				}
				{
					category.enabled && (
						<Button
							variant="secondary"
							icon={ <Edit /> }
							className="dlx-patterns-view-category-card__action-button"
							onClick={ () => {
								props.onEditCategory( category );
							} }
						>
							{ __( 'Edit', 'pattern-wrangler' ) }
						</Button>
					)
				}
				{
					( ! category.enabled && category.mappedTo ) && (
						<Button
							variant="tertiary"
							className="dlx-patterns-view-category-card__action-button"
							label={ __( 'Manage how this registered category maps to local categories', 'pattern-wrangler' ) }
							showTooltip={ true }
						>
							{ __( 'Edit Mapping', 'pattern-wrangler' ) }
						</Button>
					)
				}
				{
					( ! category.enabled && ! category.mappedTo ) && (
						<Button
							variant="tertiary"
							icon={ <ArrowRight /> }
							className="dlx-patterns-view-category-card__action-button"
							label={ __( 'Map to Category', 'pattern-wrangler' ) }
							showTooltip={ true }
						>
							{ __( 'Map', 'pattern-wrangler' ) }
						</Button>
					)
				}
				{
					( ! category.enabled && category.registered ) && (
						<Button
							variant="secondary"
							icon={ <Eye /> }
							className="dlx-patterns-view-category-card__action-button"
							label={ __( 'Re-Enable Category', 'pattern-wrangler' ) }
							showTooltip={ true }
						>
							{ __( 'Re-Enable', 'pattern-wrangler' ) }
						</Button>
					)
				}
			</div>
		);
	};
	return (
		<div
			className={
				classnames( 'dlx-patterns-view-category-card', {
					'is-registered': category.registered,
					'is-local': ! category.registered,
					'is-enabled': category.enabled,
					'is-disabled': ! category.enabled,
					'is-selected': getValues( `categoriesSelected[${ category.slug }]` ) || false,
				} )
			}
		>
			<div className="dlx-patterns-view-category-card__checkbox">
				<Controller
					key={ category.slug }
					control={ control }
					name={ `categoriesSelected[${ category.slug }]` }
					render={ ( { field } ) => (
						<CheckboxControl
							checked={ field.value || false }
							onChange={ field.onChange }
							aria-label={ __( 'Select category', 'pattern-wrangler' ) + ' ' + category.label }
						/>
					) }
				/>
			</div>
			<div className="dlx-patterns-view-category-card__header">
				{ getCategoryEnabledStatus() }
				<div className="dlx-patterns-view-category-card__type">
					{ getCategoryType() }
				</div>
			</div>
			<div className="dlx-patterns-view-category-card__content">
				<div className="dlx-patterns-view-category-card__label">
					{ category.label }
				</div>
				<div className="dlx-patterns-view-category-card__slug">
					{ category.slug }
				</div>
			</div>
			{ getCategoryActions() }
		</div>
	);
};
export default CategoryCard;
