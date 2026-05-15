/**
 * Patterns Library DataViews preferences (per page, sort) in localStorage.
 *
 * @package
 */

export const PATTERNS_LIBRARY_VIEW_STORAGE_KEY = 'dlx-pw-patterns-library-view';

const STORAGE_VERSION = 1;

const ALLOWED_SORT_FIELDS = [ 'title' ];
const ALLOWED_SORT_DIRECTIONS = [ 'asc', 'desc' ];

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
 * @param {Object} patch Partial update (perPage, sort).
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
 * Apply stored perPage and sort to a default view using URL refinement: URL wins
 * when both orderby and order are set; otherwise fill missing pieces from storage.
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
		const n = normalizePerPage( stored.perPage );
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

	return defaultView;
}

/**
 * Persist perPage and sort when they differ from the previous view.
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

	const perPageChanged = prevPerPage !== newPerPage;
	const sortChanged = prevField !== newField || prevDirection !== newDirection;

	if ( ! perPageChanged && ! sortChanged ) {
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

	if ( Object.keys( patch ).length > 0 ) {
		writePatternsLibraryViewPreferences( patch );
	}
}

export function resetPatternsLibraryViewPreferences() {
	localStorage.removeItem( PATTERNS_LIBRARY_VIEW_STORAGE_KEY );
}
