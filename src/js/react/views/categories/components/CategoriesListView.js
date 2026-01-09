/* eslint-disable react/no-unknown-property */
import {
	useState,
	useMemo,
	useEffect,
	useRef,
	Suspense,
} from '@wordpress/element';
import { useResizeObserver } from '@wordpress/compose';
import { downloadBlob } from '@wordpress/blob';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.umd.js';
import { escapeAttribute } from '@wordpress/escape-html';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { __, _n } from '@wordpress/i18n';
import {
	Button,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	FormFileUpload,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { DataViews } from '@wordpress/dataviews';
import {
	addQueryArgs,
	getQueryArgs,
	removeQueryArgs,
	cleanForSlug,
} from '@wordpress/url';
import { useDispatch, useSelect, dispatch, select } from '@wordpress/data';
import BeatLoader from 'react-spinners/BeatLoader';
import Snackbar from './Snackbar';
import categoriesStore from '../store';
import createPatternFromFile from '../utils/createPatternFromFile';

const CategoriesListView = ( props ) => {
	const { categories, loading, error } = useSelect( ( newSelect ) => {
		return {
			categories: newSelect( categoriesStore ).getCategories(),
			loading: newSelect( categoriesStore ).getLoading(),
			error: newSelect( categoriesStore ).getError(),
		};
	} );

	useEffect( () => {
		dispatch( categoriesStore ).fetchData();
	}, [] );

	// Show loading state.
	if ( loading ) {
		return (
			<div className="dlx-patterns-view-container-wrapper">
				<div className="dlx-patterns-view-container">
					<div className="dataviews-wrapper">
						<div className="dlx-patterns-view-container-header">
							<h1>{ __( 'Loading categories…', 'pattern-wrangler' ) }</h1>
							<BeatLoader size={ 30 } color="#3c434a" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Show error state.
	if ( error ) {
		return (
			<div className="dlx-patterns-view-error">
				<p>
					{ __( 'Error loading categories:', 'pattern-wrangler' ) } { error }
				</p>
				<Button
					variant="primary"
					onClick={ () => dispatch( categoriesStore ).fetchData() }
				>
					{ __( 'Retry', 'pattern-wrangler' ) }
				</Button>
			</div>
		);
	}

	return <Interface data={ data } { ...props } />;
};

// Get query args from current URL.
// const queryArgs = getQueryArgs( window.location.href );

const Interface = ( props ) => {
	const { data } = props;

	const [ selectedItems, setSelectedItems ] = useState( [] );
	const { categories, doNotShowAgain } = useSelect( ( newSelect ) => {
		return {
			categories: newSelect( categoriesStore ).getCategories(),
			doNotShowAgain: newSelect( patternsStore ).getDoNotShowAgain(),
		};
	} );

	const [ localCategories, setLocalCategories ] = useState( [] );
	const [ registeredCategories, setRegisteredCategories ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const [ snackbar, setSnackbar ] = useState( {
		isVisible: false,
		message: '',
		title: '',
		type: '',
	} );

	if ( loading ) {
		return <>Loading...</>;
	}

	return (
		<div className="dlx-patterns-view-container-wrapper">
			<div className="dlx-patterns-view-container">
				<div className="dlx-patterns-view-container-header">
					<h1>{ __( 'Pattern Categories', 'pattern-wrangler' ) }</h1>
				</div>
				<div className="dlx-patterns-view-quick-buttons-wrapper">
					<Button
						variant="primary"
						className="dlx-patterns-view-quick-button"
						onClick={ () => {
							// setIsAddNewPatternModalOpen( true );
						} }
					>
						{ __( 'Add New Category', 'pattern-wrangler' ) }
					</Button>
				</div>
				{ snackbar.isVisible && (
					<Snackbar
						isVisible={ snackbar.isVisible }
						message={ snackbar.message }
						title={ snackbar.title }
						type={ snackbar.type }
						onClose={ () => {
							setSnackbar( {
								isVisible: false,
							} );
						} }
					/>
				) }
			</div>
		</div>
	);
};

export default CategoriesListView;
