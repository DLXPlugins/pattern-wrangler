import {
	ToggleControl,
	Button,
	Popover,
	BaseControl,
	SlotFillProvider,
} from '@wordpress/components';
import { URLInput, RichText } from '@wordpress/block-editor';
import { link } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import './editor.scss';

const AlertButton = ( props ) => {
	const [ isPopOverVisible, setIsPopOverVisible ] = useState( false );
	const [ isFocusedOutside, setIsFocusedOutside ] = useState( false );

	const { attributes, setAttributes } = props;

	const { buttonText, buttonUrl, buttonTarget, buttonRelNoFollow, buttonRelSponsored } =
		attributes;

	const toggleVisible = () => {
		setIsPopOverVisible( ( state ) => ! state );
	};

	return (
		<>
			<div
				className="alerts-dlx-button-wrapper"
				style={ { display: 'inline-flex' } }
			>
				<Button
					className={ `alerts-dlx-button button-reset` }
				>
					<RichText
						tagName="span"
						placeholder={ __( 'Button text', 'quotes-dlx' ) }
						value={ buttonText }
						className="alerts-dlx-button-text"
						disableLineBreaks={ true }
						allowedFormats={ [
						] }
						onChange={ ( value ) => {
							setAttributes( { buttonText: value } );
						} }
					/>
				</Button>
				<Button
					className="button-reset alertx-dlx-button-link-icon"
					icon={ link }
					iconSize={ 25 }
					label={ __( 'Choose Link', 'quotes-dlx' ) }
					onClick={ () => {
						if ( isFocusedOutside && ! isPopOverVisible ) {
							setIsFocusedOutside( false );
						}
						if ( ! isPopOverVisible && ! isFocusedOutside ) {
							toggleVisible();
							setIsFocusedOutside( false );
						}
					} }
				/>
				<SlotFillProvider>
					<Popover.Slot />
				</SlotFillProvider>

				{ isPopOverVisible && (
					<Popover
						noArrow={ false }
						onFocusOutside={ () => {
							setIsPopOverVisible( false );
							setIsFocusedOutside( true );
						} }
					>
						<BaseControl className="alerts-dlx-button-popover-base-control">
							<div className="alerts-dlx-button-link-select">
								<URLInput
									className={ 'alertx-dlx-button-link' }
									value={ buttonUrl }
									onChange={ ( value ) => {
										setAttributes( {
											buttonUrl: value,
											buttonHasUrl: !! value,
										} );
									} }
									__nextHasNoMarginBottom={ true }
								/>

								<>
									<ToggleControl
										label={ __( 'Open link in a new tab', 'alerts-dlx' ) }
										checked={ buttonTarget || '' }
										onChange={ ( value ) => {
											setAttributes( {
												buttonTarget: value,
											} );
										} }
										className="alerts-dlx-link-toggle"
									/>

									<ToggleControl
										label={ __( 'Add rel="nofollow"', 'alerts-dlx' ) }
										checked={ buttonRelNoFollow || '' }
										onChange={ ( value ) => {
											setAttributes( {
												buttonRelNoFollow: value,
											} );
										} }
										className="alerts-dlx-link-toggle"
									/>

									<ToggleControl
										label={ __( 'Add rel="sponsored"', 'alerts-dlx' ) }
										checked={ buttonRelSponsored || '' }
										onChange={ ( value ) => {
											setAttributes( {
												buttonRelSponsored: value,
											} );
										} }
										className="alerts-dlx-link-toggle"
									/>
								</>
							</div>
						</BaseControl>
					</Popover>
				) }
			</div>
		</>
	);
};

export default AlertButton;
