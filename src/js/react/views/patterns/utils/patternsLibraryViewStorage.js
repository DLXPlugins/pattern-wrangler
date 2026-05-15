/**
 * Patterns Library DataViews preferences (per page, sort, preview size) in localStorage.
 *
 * @package
 */

export const PATTERNS_LIBRARY_VIEW_STORAGE_KEY = 'dlx-pw-patterns-library-view';

const STORAGE_VERSION = 1;

const ALLOWED_SORT_FIELDS = [ 'title' ];
const ALLOWED_SORT_DIRECTIONS = [ 'asc', 'desc' ];
const DEFAULT_PREVIEW_SIZE = 300;
const MIN_PREVIEW_SIZE = 100;
const MAX_PREVIEW_SIZE = 500;

/**
 * Normalize per-page value for storage and restore.
 *
 * @param {*} value Raw value.
 * @return {number|null} Positive integer or null.
 */
function normalizePerPage( value ) {
	const n = parseInt( value, 10 );
	if ( Number.isNaN( n ) || n < 1 || n > 999 ) {
		return null;
	}
	return n;
}

/**
 * Normalize grid preview size (pixels, any positive integer in a safe range).
 *
 * @param {*} value Raw value.
 * @return {number|null} Integer or null if invalid.
 */
function normalizePreviewSize( value ) {
	const n = parseInt( value, 10 );
	if ( Number.isNaN( n ) || n < MIN_PREVIEW_SIZE || n > MAX_PREVIEW_SIZE ) {
		return null;
	}
	return n;
}

/**
 * Normalize sort field (only values supported by getFilteredPatternsOrdered).
 *
 * @param {*} value Raw value.
 * @return {string|null} Field slug or null.
 */
function normalizeSortField( value ) {
	if ( typeof value !== 'string' ) {
		return null;
	}
	const field = value.trim();
	return ALLOWED_SORT_FIELDS.includes( field ) ? field : null;
}

/**
 * Normalize sort direction.
 *
 * @param {*} value Raw value.
 * @return {string|null} asc or desc or null.
 */
function normalizeSortDirection( value ) {
	if ( typeof value !== 'string' ) {
		return null;
	}
	const direction = value.trim().toLowerCase();
	return ALLOWED_SORT_DIRECTIONS.includes( direction ) ? direction : null;
}

/**
 * Read merged preferences object from localStorage.
 *
 * @return {Object|null} Parsed object or null.
 */
export function readPatternsLibraryViewPreferences() {
	try {
		const raw = window.localStorage.getItem( PATTERNS_LIBRARY_VIEW_STORAGE_KEY );
		if ( ! raw ) {
			return null;
		}
		const parsed = JSON.parse( raw );
		if ( ! parsed || typeof parsed !== 'object' ) {
			return null;
		}
		return parsed;
	} catch {
		return null;
	}
}

/**
 * Resolved per-page count from storage, for views that should keep the user preference (e.g. filter reset).
 *
 * @param {number} fallback Value when storage is missing or invalid.
 * @return {number} Per page count.
 */
export function getPreferredPatternsLibraryPerPage( fallback = 10 ) {
	const stored = readPatternsLibraryViewPreferences();
	const n = normalizePerPage( stored?.perPage );
	return n !== null ? n : fallback;
}

/**
 * Resolved grid preview size from storage.
 *
 * @param {number} fallback Value when storage is missing or invalid.
 * @return {number} Preview size in pixels.
 */
export function getPreferredPatternsLibraryPreviewSize(
	fallback = DEFAULT_PREVIEW_SIZE
) {
	const stored = readPatternsLibraryViewPreferences();
	const n = normalizePreviewSize( stored?.previewSize );
	return n !== null ? n : fallback;
}

/**
 * Resolved sort field and direction from storage, for views that should keep the user preference (e.g. filter reset).
 *
 * @param {Object} fallback Value when storage is missing or invalid.
 * @return {Object} Sort field and direction.
 */
export function getPreferredPatternsLibrarySort(
	fallback = { field: 'title', direction: 'asc' }
) {
	const stored = readPatternsLibraryViewPreferences();
	const field = normalizeSortField( stored?.sort?.field );
	const direction = normalizeSortDirection( stored?.sort?.direction );
	return {
		field: field !== null ? field : fallback.field,
		direction: direction !== null ? direction : fallback.direction,
	};
}
/**
 * Write preferences, merging onto any existing JSON so future keys are preserved.
 *
 * @param {Object} patch Partial update (perPage, sort, previewSize).
 * @return {void}
 */
export function writePatternsLibraryViewPreferences( patch ) {
	try {
		const existing = readPatternsLibraryViewPreferences() || {};
		const next = {
			...existing,
			v: STORAGE_VERSION,
			...patch,
		};
		if ( patch.sort && typeof patch.sort === 'object' ) {
			next.sort = {
				...( existing.sort && typeof existing.sort === 'object'
					? existing.sort
					: {} ),
				...patch.sort,
			};
		}
		window.localStorage.setItem(
			PATTERNS_LIBRARY_VIEW_STORAGE_KEY,
			JSON.stringify( next )
		);
	} catch {
		// Private mode or quota; ignore.
	}
}

/**
 * Apply stored perPage, sort, and preview layout to a default view using URL refinement: URL wins
 * when both orderby and order are set; otherwise fill missing sort pieces from storage. Preview size
 * is applied from storage when valid (positive pixel size within a safe range).
 *
 * @param {Object} defaultView  View object from getDefaultView (mutated in place).
 * @param {Object} rawQueryArgs Output of getQueryArgs( window.location.href ).
 * @return {Object} Same defaultView reference.
 */
export function applyStoredPatternsLibraryViewPreferences(
	defaultView,
	rawQueryArgs
) {
	const raw =
		rawQueryArgs && typeof rawQueryArgs === 'object' ? rawQueryArgs : {};
	const stored = readPatternsLibraryViewPreferences();

	const perPageRaw = raw.perPage ?? raw.per_page;
	const perPageExplicit =
		perPageRaw !== undefined &&
		perPageRaw !== null &&
		String( perPageRaw ).trim() !== '';

	if ( ! perPageExplicit && stored?.perPage !== null ) {
		const n = normalizePerPage( stored?.perPage ?? 10 );
		if ( n !== null ) {
			defaultView.perPage = n;
		}
	}

	const orderbyRaw = raw.orderby;
	const orderRaw = raw.order;
	const hasOrderby =
		orderbyRaw !== undefined &&
		orderbyRaw !== null &&
		String( orderbyRaw ).trim() !== '';
	const hasOrder =
		orderRaw !== undefined &&
		orderRaw !== null &&
		String( orderRaw ).trim() !== '';

	if ( ! hasOrderby && ! hasOrder ) {
		const field = normalizeSortField( stored?.sort?.field );
		const direction = normalizeSortDirection( stored?.sort?.direction );
		if ( field ) {
			defaultView.sort.field = field;
		}
		if ( direction ) {
			defaultView.sort.direction = direction;
		}
	} else if ( hasOrderby && ! hasOrder ) {
		const direction = normalizeSortDirection( stored?.sort?.direction );
		if ( direction ) {
			defaultView.sort.direction = direction;
		}
	} else if ( ! hasOrderby && hasOrder ) {
		const field = normalizeSortField( stored?.sort?.field );
		if ( field ) {
			defaultView.sort.field = field;
		}
	}

	const storedPreview = normalizePreviewSize( stored?.previewSize );
	if ( storedPreview !== null ) {
		defaultView.layout = {
			...( defaultView.layout && typeof defaultView.layout === 'object'
				? defaultView.layout
				: {} ),
			previewSize: storedPreview,
		};
	}

	return defaultView;
}

/**
 * Persist perPage, sort, and previewSize when they differ from the previous view.
 *
 * @param {Object|null|undefined} prevView Previous React view state.
 * @param {Object}                newView  View after change.
 * @return {void}
 */
export function persistPatternsLibraryViewPreferencesIfChanged(
	prevView,
	newView
) {
	if ( ! newView || typeof newView !== 'object' ) {
		return;
	}
	const prevPerPage = prevView?.perPage;
	const newPerPage = newView.perPage;
	const prevField = prevView?.sort?.field;
	const newField = newView?.sort?.field;
	const prevDirection = prevView?.sort?.direction;
	const newDirection = newView?.sort?.direction;
	const prevPreviewSize = prevView?.layout?.previewSize;
	const newPreviewSize = newView?.layout?.previewSize;

	const perPageChanged = prevPerPage !== newPerPage;
	const sortChanged = prevField !== newField || prevDirection !== newDirection;
	const previewSizeChanged = prevPreviewSize !== newPreviewSize;

	if ( ! perPageChanged && ! sortChanged && ! previewSizeChanged ) {
		return;
	}

	const patch = {};
	if ( perPageChanged ) {
		const n = normalizePerPage( newPerPage );
		if ( n !== null ) {
			patch.perPage = n;
		}
	}
	if ( sortChanged ) {
		const field = normalizeSortField( newField ) || 'title';
		const direction = normalizeSortDirection( newDirection ) || 'asc';
		patch.sort = { field, direction };
	}
	if ( previewSizeChanged ) {
		const ps = normalizePreviewSize( newPreviewSize );
		if ( ps !== null ) {
			patch.previewSize = ps;
		}
	}

	if ( Object.keys( patch ).length > 0 ) {
		writePatternsLibraryViewPreferences( patch );
	}
}

export function resetPatternsLibraryViewPreferences() {
	localStorage.removeItem( PATTERNS_LIBRARY_VIEW_STORAGE_KEY );
}
