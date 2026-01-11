import { __, _n } from '@wordpress/i18n';
import { AlertCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from '@wordpress/components';
import classnames from 'classnames';
const CategoryCard = ( props ) => {
	const { category } = props;
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
		string +=
			' ' +
			'(' +
			category.count +
			' ' +
			_n( 'Pattern', 'Patterns', category.count, 'pattern-wrangler' ) +
			')';
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
							className="dlx-patterns-view-category-card__action-button"
						>
							{ __( 'Delete Category', 'pattern-wrangler' ) }
						</Button>
					)
				}
				{
					category.enabled && (
						<Button
							variant="tertiary"
							icon={ <Edit /> }
							className="dlx-patterns-view-category-card__action-button"
						>
							{ __( 'Edit', 'pattern-wrangler' ) }
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
				} )
			}
		>
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
