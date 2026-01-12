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
import { __, _n, sprintf } from '@wordpress/i18n';
import {
	Button,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	FormFileUpload,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { DataViews } from '@wordpress/dataviews';
import { Eye } from 'lucide-react';
import {
	addQueryArgs,
	getQueryArgs,
	removeQueryArgs,
	cleanForSlug,
} from '@wordpress/url';
import { useDispatch, useSelect, dispatch, select } from '@wordpress/data';
import BeatLoader from 'react-spinners/BeatLoader';
import { useForm, FormProvider, useWatch, useFormState } from 'react-hook-form';
import Snackbar from './Snackbar';
import categoriesStore from '../store';
import CategoryCard from './CategoryCard';
import CategoryCreateModal from './CategoryCreateModal';
import CategoryDeleteModal from './CategoryDeleteModal';
import RegisteredCategoryEditModal from './RegisteredCategoryEditModal';
import CategoryBulkActions from './CategoryBulkActions';

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

	return <Interface categories={ categories } { ...props } />;
};

// Get query args from current URL.
// const queryArgs = getQueryArgs( window.location.href );

const Interface = ( props ) => {
	const { categories } = props;

	const { doNotShowAgain } = useSelect( ( newSelect ) => {
		return {
			doNotShowAgain: newSelect( categoriesStore ).getDoNotShowAgain(),
		};
	} );

	const [ isAddNewCategoryModalOpen, setIsAddNewCategoryModalOpen ] =
		useState( false );
	const [ isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen ] =
		useState( false );
	const [ isEditCategoryModalOpen, setIsEditCategoryModalOpen ] = useState( false );
	const [ isEditRegisteredCategoryModalOpen, setIsEditRegisteredCategoryModalOpen ] = useState( false );

	const [ view, setView ] = useState( {
		filters: [
			{ field: 'categoryType', operator: 'is', value: 'both' },
			{
				field: 'categoryLocalRegisteredStatus',
				operator: 'is',
				value: 'enabled',
			},
		],
	} );
	const [ categoriesDisplay, setCategoriesDisplay ] = useState( [] );

	const [ snackbar, setSnackbar ] = useState( {
		isVisible: false,
		message: '',
		title: '',
		type: '',
	} );

	/**
	 * Get the default values for the form.
	 *
	 * @return {Object} The default values object.
	 */
	const getDefaultValues = () => {
		return {
			categoriesSelected: [],
			bulkActionSelected: false,
		};
	};

	/**
	 * Retrieve a list of modified patterns based on query vars and the current view.
	 *
	 * @param {Object} newView The new view object.
	 * @return {Array} The patterns for display.
	 */
	const getCategoriesForDisplay = ( newView ) => {
		let categoriesCopy = { ...categories };

		// Filter by categories.
		const filters = newView?.filters || [];
		if ( filters.length > 0 ) {
			filters.forEach( ( filter ) => {
				switch ( filter.field ) {
					case 'categoryType':
						if ( filter.value ) {
							switch ( filter.value ) {
								case 'both':
									break;
								case 'local':
									categoriesCopy = Object.values( categoriesCopy ).filter(
										( category ) => ! category.registered
									);
									break;
								case 'registered':
									categoriesCopy = Object.values( categoriesCopy ).filter(
										( category ) => category.registered
									);
									break;
							}
						}
						break;
					case 'categoryRegisteredStatus':
						if ( filter.value ) {
							switch ( filter.value ) {
								case 'enabled':
									categoriesCopy = Object.values( categoriesCopy ).filter(
										( category ) => {
											return category.enabled;
										}
									);
									break;
								case 'disabled':
									categoriesCopy = Object.values( categoriesCopy ).filter(
										( category ) => {
											return ! category.enabled;
										}
									);
									break;
								case 'both':
									break;
							}
						}
						break;
					case 'categoryLocalRegisteredStatus':
						if ( filter.value ) {
							switch ( filter.value ) {
								case 'enabled':
									categoriesCopy = Object.values( categoriesCopy ).filter(
										( category ) => {
											return category.enabled;
										}
									);
									break;
								case 'disabled':
									categoriesCopy = Object.values( categoriesCopy ).filter(
										( category ) => {
											return ! category.enabled;
										}
									);
									break;
								case 'both':
									break;
							}
						}
						break;
				}
			} );
		}
		return Object.values( categoriesCopy );
	};

	/**
	 * When a view is changed, we need to adjust the fields and showMedia based on the view type.
	 *
	 * @param {Object} newView The new view object.
	 */
	const onChangeView = ( newView ) => {
		// Create query args object with view state.
		const changeQueryArgs = getQueryArgs( window.location.href );

		// Get the category type from filters.
		const categoryTypeFilter = newView.filters?.find(
			( filter ) => filter.field === 'categoryType'
		);
		if ( categoryTypeFilter ) {
			changeQueryArgs.categoryType = categoryTypeFilter.value;
		}

		// Get registered/local category disabled/enabled status from filters.
		const categoryRegisteredStatusFilter = newView.filters?.find(
			( filter ) => filter.field === 'categoryRegisteredStatus'
		);
		const categoryLocalStatusFilter = newView.filters?.find(
			( filter ) => filter.field === 'categoryLocalStatus'
		);
		const categoryLocalRegisteredStatusFilter = newView.filters?.find(
			( filter ) => filter.field === 'categoryLocalRegisteredStatus'
		);

		if ( categoryRegisteredStatusFilter ) {
			changeQueryArgs.categoryRegisteredStatus =
				categoryRegisteredStatusFilter.value;
		}
		if ( categoryLocalStatusFilter ) {
			changeQueryArgs.categoryLocalStatus = categoryLocalStatusFilter.value;
		}
		if ( categoryLocalRegisteredStatusFilter ) {
			changeQueryArgs.categoryLocalRegisteredStatus =
				categoryLocalRegisteredStatusFilter.value;
		}

		// Update URL without page reload using addQueryArgs.
		let newUrl = addQueryArgs( window.location.pathname, changeQueryArgs );
		if ( getQueryArgs( window.location.href ).search && ! newView.search ) {
			newUrl = removeQueryArgs( newUrl, 'search' );
		}

		// If no filters are set, add a patternType and patternLocalRegisteredStatus filters with value 'all' and 'enabled' respectively.
		if ( newView.filters?.length === 0 ) {
			newView.filters = [
				...newView.filters,
				{ field: 'categoryType', operator: 'is', value: 'all' },
				{
					field: 'categoryLocalRegisteredStatus',
					operator: 'is',
					value: 'enabled',
				},
			];
		}

		setCategoriesDisplay( getCategoriesForDisplay( newView ) );

		window.history.pushState( {}, '', newUrl );

		setView( {
			...newView,
			...changeQueryArgs,
		} );
	};

	// Default values will be reset when async data loads (in SocialNetworksPanel).
	const methods = useForm( {
		defaultValues: getDefaultValues(), // Start with empty defaults, will be reset when data loads.
		mode: 'onBlur', // Validate on blur for better UX in popovers.
		reValidateMode: 'onChange', // Re-validate and clear errors immediately when user starts typing.
		shouldUnregister: false, // Keep fields registered even when not rendered.
		resetOptions: {
			keepDirtyValues: false,
			keepErrors: false,
		},
	} );

	const actions = useMemo( () => {
		return [
			{
				id: 'delete-category',
				getLabel: ( items ) => {
					// Local categories only.
					items = items.filter( ( item ) => ! item.registered );
					return sprintf(
						/* translators: %d: number of categories */
						_n(
							'Delete %d Category',
							'Delete %d Categories',
							items.length,
							'pattern-wrangler'
						),
						items.length
					);
				},
				icon: 'trash',
				callback: ( items ) => {
					setIsDeleteCategoryModalOpen( {
						isOpen: true,
						items,
					} );
				},
				isEligible: ( category ) => {
					return ! category.registered;
				},
				isDestructive: true,
			},
			{
				id: 'enable-categories',
				getLabel: ( items ) => {
					// Registered categories only.
					items = items.filter( ( item ) => item.registered && ! item.enabled );
					return sprintf(
						/* translators: %d: number of categories */
						_n(
							'Enable %d Category',
							'Enable %d Categories',
							items.length,
							'pattern-wrangler'
						),
						items.length
					);
				},
				icon: 'visibility',
				callback: ( items ) => {
					// todo - launch modal.
				},
				isEligible: ( item ) => {
					return item.registered && ! item.enabled;
				},
				isDestructive: false,
			},
			{
				id: 'disable-categories',
				getLabel: ( items ) => {
					// Registered categories only.
					items = items.filter( ( item ) => item.registered && item.enabled );
					return sprintf(
						/* translators: %d: number of categories */
						_n(
							'Disable %d Category',
							'Disable %d Categories',
							items.length,
							'pattern-wrangler'
						),
						items.length
					);
				},
				icon: 'controls-pause',
				callback: ( items ) => {
					// todo - launch modal.
				},
				isEligible: ( item ) => {
					return item.registered && item.enabled;
				},
				isDestructive: true,
			},
		];
	}, [] );

	useEffect( () => {
		onChangeView( view );
	}, [ categories ] );

	const CategoryList = useMemo( () => {
		return categoriesDisplay.map( ( category ) => {
			return (
				<CategoryCard
					key={ category.slug }
					category={ category }
					onDeleteCategory={ ( categoriesToDelete ) => {
						setIsDeleteCategoryModalOpen( {
							isOpen: true,
							items: categoriesToDelete,
						} );
					} }
					onEditCategory={ ( categoryToEdit ) => {
						setIsEditCategoryModalOpen( {
							isOpen: true,
							category: categoryToEdit,
						} );
					} }
					onEditRegisteredCategory={ ( categoryToEdit ) => {
						setIsEditRegisteredCategoryModalOpen( {
							isOpen: true,
							category: categoryToEdit,
						} );
					} }
				/>
			);
		} );
	}, [ categoriesDisplay, categories ] );

	const getBulkActions = () => {
		return (
			<>
				<div className="dlx-patterns-view-button-actions-wrapper dlx-bulk-action-toolbar-top">
					<CategoryBulkActions
						categories={ categoriesDisplay }
						actions={ actions }
					/>
				</div>
			</>
		);
	};

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
							setIsAddNewCategoryModalOpen( {
								isOpen: true,
								termId: 0,
							} );
						} }
					>
						{ __( 'Add New Category', 'pattern-wrangler' ) }
					</Button>
				</div>
				<div className="dlx-patterns-view-categories">
					<FormProvider { ...methods }>
						<div className="dlx-patterns-view-button-actions-wrapper">
							<ToggleGroupControl
								label={ __( 'Category Type', 'pattern-wrangler' ) }
								isAdaptiveWidth={ true }
								hideLabelFromVision={ true }
								value={
									view?.filters?.find(
										( filter ) => filter.field === 'categoryType'
									)?.value || 'both'
								}
								onChange={ ( value ) => {
									const myNewView = { ...view };
									// Merge with existing filters, replacing patternType if it exists
									const existingFilters =
										myNewView.filters?.filter(
											( filter ) => filter.field !== 'categoryType'
										) || [];
									myNewView.filters = [
										...existingFilters,
										{ field: 'categoryType', operator: 'is', value },
									];
									// Remove categoryRegisteredStatus and categoryLocalRegisteredStatus from the filters.
									myNewView.filters =
										myNewView.filters?.filter(
											( filter ) =>
												filter.field !== 'categoryRegisteredStatus' &&
												filter.field !== 'categoryLocalRegisteredStatus'
										) || [];

									let categoryUrl = window.location.href;
									switch ( value ) {
										case 'both':
											categoryUrl = removeQueryArgs(
												categoryUrl,
												'categoryRegisteredStatus'
											);
											categoryUrl = removeQueryArgs(
												categoryUrl,
												'categoryLocalRegisteredStatus'
											);
											window.history.pushState( {}, '', categoryUrl );
											break;
										case 'local':
											categoryUrl = removeQueryArgs(
												categoryUrl,
												'categoryRegisteredStatus'
											);
											categoryUrl = removeQueryArgs(
												categoryUrl,
												'categoryLocalRegisteredStatus'
											);
											window.history.pushState( {}, '', categoryUrl );
											break;
										case 'registered':
											categoryUrl = removeQueryArgs(
												categoryUrl,
												'categoryRegisteredStatus'
											);
											categoryUrl = removeQueryArgs(
												categoryUrl,
												'categoryLocalRegisteredStatus'
											);
											window.history.pushState( {}, '', categoryUrl );
											break;
										default:
											break;
									}

									onChangeView( myNewView );
								} }
							>
								<ToggleGroupControlOption
									value="local"
									label={ __( 'Local', 'pattern-wrangler' ) }
									showTooltip={ true }
									aria-label={ __(
										'Show Only Local Categories',
										'pattern-wrangler'
									) }
								/>
								<ToggleGroupControlOption
									value="both"
									label={ __( 'Both', 'pattern-wrangler' ) }
									showTooltip={ true }
									aria-label={ __( 'Show All Categories', 'pattern-wrangler' ) }
								/>
								<ToggleGroupControlOption
									value="registered"
									label={ __( 'Registered', 'pattern-wrangler' ) }
									showTooltip={ true }
									aria-label={ __(
										'Show Only Registered Categories',
										'pattern-wrangler'
									) }
								/>
							</ToggleGroupControl>
							{
								// If patttern type is local, show synced|both|unsynced buttons.
								view?.filters?.find( ( filter ) => filter.field === 'categoryType' )
									?.value === 'registered' && (
									<>
										<ToggleGroupControl
											label={ __(
												'Category Registered Status',
												'pattern-wrangler'
											) }
											isAdaptiveWidth={ true }
											hideLabelFromVision={ true }
											value={
												view?.filters?.find(
													( filter ) =>
														filter.field === 'categoryRegisteredStatus'
												)?.value || 'both'
											}
											onChange={ ( value ) => {
												const myNewView = { ...view };
												// Merge with existing filters, replacing patternStatus if it exists
												const existingFilters =
													myNewView.filters?.filter(
														( filter ) =>
															filter.field !== 'categoryRegisteredStatus'
													) || [];
												myNewView.filters = [
													...existingFilters,
													{
														field: 'categoryRegisteredStatus',
														operator: 'is',
														value,
													},
												];
												// Reset to first page when filter changes
												myNewView.page = 1;
												onChangeView( myNewView );
											} }
										>
											<ToggleGroupControlOption
												value="disabled"
												label={ __( 'Disabled', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __(
													'Show Only Disabled Categories',
													'pattern-wrangler'
												) }
											/>
											<ToggleGroupControlOption
												value="both"
												label={ __( 'Both', 'pattern-wrangler' ) }
												aria-label={ __(
													'Show Both Disabled and Enabled Categories',
													'pattern-wrangler'
												) }
												showTooltip={ true }
											/>
											<ToggleGroupControlOption
												value="enabled"
												label={ __( 'Enabled', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __(
													'Show Only Enabled Categories',
													'pattern-wrangler'
												) }
											/>
										</ToggleGroupControl>
									</>
								)
							}
							{
								// If patttern type is local, show synced|both|unsynced buttons.
								view?.filters?.find( ( filter ) => filter.field === 'categoryType' )
									?.value === 'both' && (
									<>
										<ToggleGroupControl
											label={ __( 'Category Status', 'pattern-wrangler' ) }
											isAdaptiveWidth={ true }
											hideLabelFromVision={ true }
											value={
												view?.filters?.find(
													( filter ) =>
														filter.field === 'categoryLocalRegisteredStatus'
												)?.value || 'enabled'
											}
											onChange={ ( value ) => {
												const myNewView = { ...view };
												// Merge with existing filters, replacing patternStatus if it exists
												const existingFilters =
													myNewView.filters?.filter(
														( filter ) =>
															filter.field !== 'categoryLocalRegisteredStatus'
													) || [];
												myNewView.filters = [
													...existingFilters,
													{
														field: 'categoryLocalRegisteredStatus',
														operator: 'is',
														value,
													},
												];
												// Reset to first page when filter changes
												myNewView.page = 1;
												onChangeView( myNewView );
											} }
										>
											<ToggleGroupControlOption
												value="disabled"
												label={ __( 'Disabled', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __(
													'Show Only Disabled Categories',
													'pattern-wrangler'
												) }
											/>
											<ToggleGroupControlOption
												value="both"
												label={ __( 'Both', 'pattern-wrangler' ) }
												aria-label={ __(
													'Show Both Disabled and Enabled Categories',
													'pattern-wrangler'
												) }
												showTooltip={ true }
											/>
											<ToggleGroupControlOption
												value="enabled"
												label={ __( 'Enabled', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __(
													'Show Only Enabled Categories',
													'pattern-wrangler'
												) }
											/>
										</ToggleGroupControl>
									</>
								)
							}
						</div>
						{ getBulkActions() }
						<div className="dlx-patterns-view-categories-list">
							{ CategoryList }
						</div>
						{ getBulkActions() }
					</FormProvider>
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
				{ isAddNewCategoryModalOpen.isOpen && (
					<CategoryCreateModal
						isOpen={ isAddNewCategoryModalOpen.isOpen }
						onRequestClose={ () => setIsAddNewCategoryModalOpen( false ) }
						termId={ isAddNewCategoryModalOpen.termId }
						onCreate={ ( createdCategory ) => {
							dispatch( categoriesStore ).addCategory( createdCategory );
							setIsAddNewCategoryModalOpen( false );
							setSnackbar( {
								isVisible: true,
								message: __(
									'Category created successfully.',
									'pattern-wrangler'
								),
								title: __( 'Category Created', 'pattern-wrangler' ),
								type: 'success',
							} );
						} }
					/>
				) }
				{ isDeleteCategoryModalOpen.isOpen && (
					<CategoryDeleteModal
						isOpen={ isDeleteCategoryModalOpen.isOpen }
						onRequestClose={ () => setIsDeleteCategoryModalOpen( false ) }
						items={ isDeleteCategoryModalOpen.items }
						onDelete={ () => {
							dispatch( categoriesStore ).deleteCategories(
								isDeleteCategoryModalOpen.items
							);

							setSnackbar( {
								isVisible: true,
								message: __(
									'Categories deleted successfully.',
									'pattern-wrangler'
								),
								title: __( 'Categories Deleted', 'pattern-wrangler' ),
								type: 'success',
							} );
						} }
					/>
				) }
				{ isEditCategoryModalOpen.isOpen && (
					<CategoryCreateModal
						isOpen={ isEditCategoryModalOpen.isOpen }
						onRequestClose={ () => setIsEditCategoryModalOpen( false ) }
						termId={ isEditCategoryModalOpen.category.id }
						termTitle={ isEditCategoryModalOpen.category.label }
						termSlug={ isEditCategoryModalOpen.category.slug }
						termNonce={ isEditCategoryModalOpen.category.editNonce }
						isEditMode={ true }
						onEdit={ ( editedCategory ) => {
							dispatch( categoriesStore ).updateCategory( editedCategory );
							setIsEditCategoryModalOpen( false );
							setSnackbar( {
								isVisible: true,
								message: __(
									'Category edited successfully.',
									'pattern-wrangler'
								),
								title: __( 'Category Edited', 'pattern-wrangler' ),
								type: 'success',
							} );
						} }
					/>
				) }
				{ isEditRegisteredCategoryModalOpen.isOpen && (
					<RegisteredCategoryEditModal
						isOpen={ isEditRegisteredCategoryModalOpen.isOpen }
						onRequestClose={ () => setIsEditRegisteredCategoryModalOpen( false ) }
						termTitle={ isEditRegisteredCategoryModalOpen.category.customLabel || isEditRegisteredCategoryModalOpen.category.label }
						termSlug={ isEditRegisteredCategoryModalOpen.category.slug }
						termNonce={ isEditRegisteredCategoryModalOpen.category.editNonce }
						onEditRegisteredCategory={ ( editedCategory ) => {
							dispatch( categoriesStore ).updateRegisteredCategory( editedCategory );
							setIsEditRegisteredCategoryModalOpen( false );
							setSnackbar( {
								isVisible: true,
								message: __( 'Category edited successfully.', 'pattern-wrangler' ),
								title: __( 'Category Edited', 'pattern-wrangler' ),
								type: 'success',
							} );
						} }
					/>
				) }
			</div>
		</div>
	);
};

export default CategoriesListView;
