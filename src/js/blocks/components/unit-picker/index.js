/**
 * Unit Picker Component.
 * Credit: Forked from @GenerateBlocks
 */

import { __, sprintf, _x } from '@wordpress/i18n';
import './editor.scss';

import { ButtonGroup, Button, Tooltip } from '@wordpress/components';

const UnitChooser = ( props ) => {
	const { label, value, onClick, units } = props;

	return (
		<div className="components-has-units-control-header__units">
			<div className="components-has-units-control-label__units">{ label }</div>

			<div className="components-has-control__units">
				<ButtonGroup
					className="components-has-control-buttons__units"
					aria-label={ __( 'Select Units', 'quotes-dlx' ) }
				>
					{ units.map( ( unit ) => {
						let unitName = unit;

						if ( 'px' === unit ) {
							unitName = _x(
								'Pixel',
								'A size unit for CSS markup',
								'quotes-dlx'
							);
						}

						if ( 'em' === unit ) {
							unitName = _x(
								'Em',
								'A size unit for CSS markup',
								'quotes-dlx'
							);
						}

						if ( '%' === unit ) {
							unitName = _x(
								'Percentage',
								'A size unit for CSS markup',
								'quotes-dlx'
							);
						}

						if ( 'vw' === unit ) {
							unitName = _x(
								'View Width',
								'A size unit for CSS markup',
								'quotes-dlx'
							);
						}

						if ( 'rem' === unit ) {
							unitName = _x(
								'Rem',
								'A size unit for CSS markup',
								'quotes-dlx'
							);
						}

						if ( 'deg' === unit ) {
							unitName = _x(
								'Degree',
								'A size unit for CSS markup',
								'quotes-dlx'
							);
						}

						return (
							<Tooltip
								text={ sprintf(
									/* translators: Unit type (px, em, %) */
									__( '%s Units', 'quotes-dlx' ),
									unitName
								) }
								key={ unit }
							>
								<Button
									key={ unit }
									className={ 'components-has-control-button__units--' + unit }
									isSmall
									isPrimary={ value === unit }
									aria-pressed={ value === unit }
									aria-label={ sprintf(
										/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
										__( '%s Units', 'quotes-dlx' ),
										unitName
									) }
									onClick={ () => onClick( unit ) }
								>
									{ unit }
								</Button>
							</Tooltip>
						);
					} ) }
				</ButtonGroup>
			</div>
		</div>
	);
};

export default UnitChooser;
