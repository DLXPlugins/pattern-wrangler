import axios from 'axios';
/**
 * External dependencies
 */
import React, { useState, useEffect, createRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { UP, DOWN, ENTER, TAB } from '@wordpress/keycodes';
import { speak } from '@wordpress/a11y';
import { Button, Spinner, Tooltip } from '@wordpress/components';
import { useInstanceId, useDebounce } from '@wordpress/compose';
import { isURL, filterURLForDisplay, addQueryArgs } from '@wordpress/url';

import {
	Search,
	CornerDownLeft,
	XCircle,
	ExternalLink,
	Link,
	File,
	FileText,
} from 'lucide-react';

/**
 * URL Selector for Media Library.
 *
 * @param {Object} props Incoming props.
 *
 * @return {React.Component} UrlInput component.
 */
const SitePicker = ( props ) => {
	/**
	 * Create Refs for inputs.
	 */
	const inputRef = createRef();

	const restEndPoint = props.restEndpoint;
	const restNonce = props.restNonce;

	/**
	 * Set Unique Instance ID.
	 */
	const generatedUniqueId = useInstanceId( SitePicker, 'app' );

	/**
	 * Set State.
	 */
	const [ suggestions, setSuggestions ] = useState( [] );
	const [ showSuggestions, setShowSuggestions ] = useState( false );
	const [ isUpdatingSuggestions, setIsUpdatingSuggestions ] = useState( false );
	const [ currentSuggestionRequest, setCurrentSuggestionRequest ] =
		useState( null );
	const [ selectedSuggestion, setSelectedSuggestion ] = useState( null );
	const [ currentSuggestion, setCurrentSuggestion ] = useState( null );
	const [ selectedSuggestionIndex, setSelectedSuggestionIndex ] = useState( null );
	const [ suggestionListboxId, setSuggestionListboxId ] = useState( '' );
	const [ suggestionValue, setSuggestionValue ] = useState( '' );
	const [ isInitialRequest, setIsInitialRequest ] = useState( true );
	const [ savedSuggestionValue, setSavedSuggestionValue ] = useState(
		props.selectedSite
	);
	const [ uniqueInstanceId, setUniqueInstanceId ] = useState(
		`url-input-control-${ generatedUniqueId }`
	);
	const [ loading, setLoading ] = useState( false );

	/**
	 * Debounceing for delay.
	 */
	const debouncedRequest = useDebounce( ( value ) => {
		if ( isInitialRequest ) {
			// Prevent duplicate requests.
			setIsInitialRequest( false );
			return;
		}
		updateSuggestions( value );
	}, 200 );

	/**
	 * Effect.
	 */
	useEffect( () => {
		/**
		 * Run once. Set the suggestion value and current suggestion to saved value, then reset saved value.
		 */
		if ( '' !== savedSuggestionValue ) {
			const newSuggestion = {
				mapped: savedSuggestionValue,
				id: savedSuggestionValue,
				name: props.savedTitle,
				permalink: props.savedPermalink,
			};
			setSavedSuggestionValue( '' );
			setCurrentSuggestion( newSuggestion );
			return;
		}
		if ( '' !== suggestionValue ) {
			debouncedRequest( suggestionValue );
		}
	}, [ suggestionValue ] );

	/**
	 * Set Focus to input.
	 */
	useEffect( () => {
		if (
			inputRef.current &&
			( props.hasInititialFocus || '' === suggestionValue )
		) {
			inputRef.current.focus();
		}
	}, [ inputRef ] );

	/**
	 * Set the current input.
	 *
	 * @param {event} event The onChange event.
	 */
	const onChange = ( event ) => {
		setSuggestionValue( event.target.value );
	};

	/**
	 * Search when focus and no results are present.
	 *
	 * @param {event} event Focus event.
	 */
	const onFocus = ( event ) => {
		event.preventDefault();
		if ( null === selectedSuggestion && '' !== suggestionValue ) {
			// If initial request, do not do anything or show anything.
			debouncedRequest( suggestionValue );
		}
	};

	/**
	 * Perform keydown functions such as selecting the next items in a list.
	 *
	 * @param {event} event Keydown event.
	 *
	 * @return {void} Return nothing.
	 */
	const onKeyDown = ( event ) => {
		// If the suggestions are not shown or loading, we shouldn't handle the arrow keys
		// We shouldn't preventDefault to allow block arrow keys navigation.
		if ( ( ! showSuggestions && ! suggestions.length ) || loading ) {
			// In the Windows version of Firefox the up and down arrows don't move the caret
			// within an input field like they do for Mac Firefox/Chrome/Safari. This causes
			// a form of focus trapping that is disruptive to the user experience. This disruption
			// only happens if the caret is not in the first or last position in the text input.
			// See: https://github.com/WordPress/gutenberg/issues/5693#issuecomment-436684747
			switch ( event.keyCode ) {
				// When UP is pressed, if the caret is at the start of the text, move it to the 0
				// position.
				case UP: {
					if ( 0 !== event.target.selectionStart ) {
						event.preventDefault();

						// Set the input caret to position 0.
						event.target.setSelectionRange( 0, 0 );
					}
					break;
				}
				// When DOWN is pressed, if the caret is not at the end of the text, move it to the
				// last position.
				case DOWN: {
					if ( suggestionValue !== event.target.selectionStart ) {
						event.preventDefault();

						// Set the input caret to the last position.
						event.target.setSelectionRange(
							suggestionValue.length,
							suggestionValue.length
						);
					}
					break;
				}

				// Submitting while loading should trigger onSubmit.
				case ENTER: {
					event.preventDefault();
					debouncedRequest( event.target.value );
					break;
				}
			}

			return null;
		}

		switch ( event.keyCode ) {
			case UP: {
				event.preventDefault();
				const previousIndex = ! selectedSuggestionIndex
					? suggestions.length - 1
					: selectedSuggestionIndex - 1;
				setSelectedSuggestionIndex( previousIndex );
				setSelectedSuggestion( suggestions[ previousIndex ].value );
				break;
			}
			case DOWN: {
				event.preventDefault();
				if ( ! showSuggestions && suggestions.length > 0 ) {
					setShowSuggestions( true );
					setSelectedSuggestionIndex( 0 );
					setSelectedSuggestion( suggestions[ 0 ].value );
					return;
				}
				const nextIndex =
					selectedSuggestion === null ||
					selectedSuggestionIndex === suggestions.length - 1
						? 0
						: selectedSuggestionIndex + 1;
				setSelectedSuggestionIndex( nextIndex );
				setSelectedSuggestion( suggestions[ nextIndex ].value );
				break;
			}
			case TAB: {
				if ( selectedSuggestion !== null ) {
					// Announce a link has been selected when tabbing away from the input field.
					speak( __( 'Site selected.', 'pattern-wrangler' ) );
				}
				break;
			}
			case ENTER: {
				event.preventDefault();
				setShowSuggestions( false );
				if ( selectedSuggestion !== null ) {
					props.onItemSelect( event, getSuggestion( selectedSuggestion ) );
					inputRef.current.focus();
				}

				break;
			}
		}
	};

	/**
	 * Get the current suggestion and output the label.
	 *
	 * @param {string} value The current download ID.
	 *
	 * @return {Object} The suggestion label.
	 */
	const getSuggestion = ( value ) => {
		const foundSuggestion = suggestions.find(
			( suggestion ) => suggestion.value === value
		);
		if ( null === foundSuggestion || undefined === foundSuggestion ) {
			return null;
		}
		return foundSuggestion;
	};

	/**
	 * Requests a new suggestion.
	 *
	 * @param {string} value Value to search for.
	 */
	const updateSuggestions = ( value = '' ) => {
		// Initial suggestions may only show if there is no value
		// (note: this includes whitespace).
		const isInitialSuggestions = ! value?.length;

		value = value.toString();

		// Trim only now we've determined whether or not it originally had a "length"
		// (even if that value was all whitespace).
		value = value.trim();

		// Allow a suggestions request if:
		// - there are at least 1 characters in the search input (except manual searches where
		//   search input length is not required to trigger a fetch)
		if ( ! isInitialSuggestions && value.length < 1 ) {
			// todo - cancel any pending requests
			setSuggestions( [] );
			setShowSuggestions( false );
			setLoading( false );

			return;
		}

		setIsUpdatingSuggestions( true );
		setSelectedSuggestion( null );
		setLoading( true );

		const abortController = new AbortController();
		if ( null !== currentSuggestionRequest ) {
			currentSuggestionRequest.abort();
		}
		setCurrentSuggestionRequest( abortController );

		// Perform async ajax request.
		// Perform async ajax request.
		( async() => {
			setLoading( true );
			await axios
				.post(
					restEndPoint,
					{
						signal: abortController.signal,
						search: encodeURIComponent( value ),
					},
					{
						headers: {
							'X-WP-Nonce': restNonce,
						},
					}
				)
				.then( ( response ) => {
					setCurrentSuggestionRequest( null );
					const { data } = response.data;
					setSuggestions( data );
					const mappedValue = currentSuggestion?.mapped || 0;
					if ( data.length === 1 && data[ 0 ].value === mappedValue ) {
						setShowSuggestions( false );
					} else {
						setShowSuggestions( true );
					}
				} )
				.catch( ( error ) => {} )
				.then( () => {
					setLoading( false );
				} );
		} )();
	};

	return (
		<div className="pw-url-input">
			<div className="pw-pub-url-input__wrapper">
				<div className="pw-pub-url-input__input-wrapper">
					{ null !== currentSuggestion && (
						<div className="pw-pub-url-input__suggestion">
							<div className="pw-pub-url-input__suggestion-item">
								<span className="pw-pub-url-input__suggestion-label">
									<Button
										variant="link"
										icon={ <ExternalLink /> }
										iconSize={ 18 }
										iconPosition="right"
										label={ __( 'Open in new tab', 'pattern-wrangler' ) }
										href={ currentSuggestion?.permalink || '' }
										target="_blank"
										rel="noopener noreferrer"
									>
										{ currentSuggestion.name }
									</Button>
									<span className="pw-pub-url-input__suggestion-label-id">
										( { __( 'Site ID:', 'pattern-wrangler' ) } { currentSuggestion.id } )
									</span>
								</span>
								<Button
									variant="secondary"
									icon={ <XCircle /> }
									className="button-reset"
									iconSize={ 18 }
									label={ __( 'Remove Current Selection', 'pattern-wrangler' ) }
									onClick={ ( e ) => {
										setSuggestionValue( '' );
										setCurrentSuggestion( null );
										props.onItemSelect( e, '1' );
									} }
								/>
							</div>
						</div>
					) }
					{ null === currentSuggestion && (
						<div className="pw-pub-url-search-wrapper">
							<input
								type="text"
								placeholder={ __( 'Search by Site Name', 'pattern-wrangler' ) }
								id={ uniqueInstanceId }
								className="pw-pub-url-input__input"
								value={ suggestionValue }
								onChange={ onChange }
								onFocus={ onFocus }
								onKeyDown={ onKeyDown }
								aria-label={
									props.label ? undefined : __( 'Site', 'pattern-wrangler' )
								}
								aria-autocomplete="list"
								ref={ inputRef }
							/>
							{ loading && (
								<div className="pw-pub-url-input__loading">
									<Spinner />
								</div>
							) }
							{ ! loading && (
								<>
									<Button
										className="pw-pub-url-input__search-button"
										icon={ <Search /> }
										iconSize={ 18 }
										label={ __( 'Search for a Site', 'pattern-wrangler' ) }
										onClick={ () => {
											setShowSuggestions( true );
										} }
									/>
								</>
							) }
						</div>
					) }
				</div>
			</div>
			{ showSuggestions && !! suggestions.length && (
				<div className="pw-suggestions-wrapper">
					<div
						role="listbox"
						id={ suggestionListboxId }
						className="pw-url-input__suggestions"
					>
						<div className="pw-url-input__suggestions-close-wrapper">
							<Button
								variant="secondary"
								icon={ <XCircle /> }
								iconSize={ 18 }
								iconPosition="left"
								label={ __( 'Close Suggestions', 'pattern-wrangler' ) }
								onClick={ () => {
									setShowSuggestions( false );
									inputRef?.current?.focus();
								} }
								className="pw-url-input__close-suggestions button-reset"
							/>
						</div>
						<div className="pw-url-input__suggestions-wrapper">
							{ suggestions.map( ( suggestion, index ) => {
								const suggestionId = `pw-suggested-value-${ suggestion.value }`;
								const suggestionClass = classNames( 'pw-url-input__suggestion', {
									'is-selected': suggestion.value === selectedSuggestion,
								} );

								return (
									<Button
										key={ suggestionId }
										id={ suggestionId }
										value={ suggestion.value }
										role="option"
										aria-selected={ suggestion.value === selectedSuggestion }
										className={ suggestionClass }
										onClick={ ( e ) => {
											setSelectedSuggestion( parseInt( e.target.value ) );
											setSelectedSuggestionIndex( index );
											// Add mapped value to suggestion.
											suggestion.mapped = suggestion.value;
											setCurrentSuggestion( suggestion );
											setShowSuggestions( false );
											props.onItemSelect( e, suggestion.value );
										} }
										icon={ 'post' === suggestion.type ? <FileText /> : <File /> }
										iconSize={ 2 }
										iconPosition="left"
									>
										<span className="pw-search-item">
											<span className="pw-search-item-title">
												{ suggestion.name }
											</span>
											<span className="pw-search-item-info">
												{ suggestion.permalink }
											</span>
										</span>
									</Button>
								);
							} ) }
						</div>
					</div>
				</div>
			) }
		</div>
	);
};

export default SitePicker;
