import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { Button, TextControl, Tooltip } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import {
	getPatternShortcode,
	getPatternPHPFunction,
	getPatternPopupTriggerCode,
	getPatternPopupTriggerAnchorCode,
	copyToClipboard,
} from '../../utils/pattern-code-helpers';

/**
 * Row with read-only value and copy button.
 *
 * @param {Object}   opts             Options.
 * @param {string}   opts.label       Field label.
 * @param {string}   opts.value       Value to show and copy.
 * @param {string}   opts.copiedId    Which field just had "Copied!" (for button text).
 * @param {string}   opts.thisId      This field's id for copied state.
 * @param {Function} opts.setCopiedId Setter for copied id.
 * @param {string}   opts.help        Optional help text.
 * @return {Object} The rendered row.
 */
const CodeRow = ( {
	label,
	value,
	copiedId,
	thisId,
	setCopiedId,
	help,
} ) => {
	const handleCopy = async() => {
		const ok = await copyToClipboard( value );
		if ( ok ) {
			setCopiedId( thisId );
			setTimeout( () => setCopiedId( null ), 1500 );
		}
	};

	return (
		<div className="dlx-pw-pattern-code-row" style={ { marginBottom: '12px' } }>
			<style>
				{ `
					.dlx-pw-pattern-code-row {
						display: grid;
						grid-template-columns: 1fr auto;
						align-items: end;
					}
					.dlx-pw-pattern-code-row .components-base-control__field {
						margin-bottom: 0 !important;
						padding-bottom: 0 !important;
					}
					.dlx-pw-pattern-code-row .components-text-control__input {
						margin-bottom: 0 !important;
					}
					.dlx-pw-pattern-code-row .components-button {
						height: 32px !important;
					}
				` }
			</style>
			<TextControl
				label={ label }
				value={ value }
				readOnly
				help={ help }
				className="dlx-pw-pattern-code-input"
				style={ { marginBottom: '4px' } }
			/>
			<Tooltip text={ copiedId === thisId ? __( 'Copied!', 'pattern-wrangler' ) : __( 'Copy', 'pattern-wrangler' ) }>
				<Button icon="clipboard" label={ __( 'Copy', 'pattern-wrangler' ) } variant="secondary" onClick={ handleCopy } />
			</Tooltip>
		</div>
	);
};

/**
 * Render a Pattern Code Panel.
 *
 * @return {Object} The rendered component.
 */
const PatternCodePanel = () => {
	const [ copiedId, setCopiedId ] = useState( null );

	const config = typeof window.dlxPatternWranglerPreview !== 'undefined' ? window.dlxPatternWranglerPreview : {};
	const pattern = config.pattern || {};
	const id = pattern.id ?? 0;
	const slug = pattern.slug ?? '';
	const syncStatus = pattern.syncStatus ?? 'unsynced';
	const siteId = pattern.siteId ?? null;
	const isMultisite = config.isMultisite ?? false;
	const syncedPatternPopupsActive = config.syncedPatternPopupsActive ?? false;
	const syncedPatternPopupsUrl = config.syncedPatternPopupsUrl ?? '';

	const showCode = id && slug;

	if ( ! showCode ) {
		return (
			<PluginDocumentSettingPanel
				name="dlx-pattern-wrangler-code-panel"
				title={ __( 'Pattern Code', 'pattern-wrangler' ) }
				className="dlx-pw-preview-sidebar"
			>
				<p className="description">
					{ __( 'Save the pattern to see shortcode and PHP code.', 'pattern-wrangler' ) }
				</p>
			</PluginDocumentSettingPanel>
		);
	}

	const shortcode = getPatternShortcode( slug, siteId, isMultisite );
	const phpCode = getPatternPHPFunction( slug, siteId, isMultisite );
	const showSpp = syncedPatternPopupsActive && syncStatus === 'synced';

	return (
		<PluginDocumentSettingPanel
			name="dlx-pattern-wrangler-code-panel"
			title={ __( 'Pattern Code', 'pattern-wrangler' ) }
			className="dlx-pw-preview-sidebar"
		>
			<p className="description" style={ { marginBottom: '12px' } }>
				{ __(
					'Use the shortcode or PHP below to output this pattern on your site.',
					'pattern-wrangler'
				) }
			</p>
			<CodeRow
				label={ __( 'Pattern Shortcode', 'pattern-wrangler' ) }
				value={ shortcode }
				copiedId={ copiedId }
				thisId="shortcode"
				setCopiedId={ setCopiedId }
			/>
			<CodeRow
				label={ __( 'Pattern PHP Function', 'pattern-wrangler' ) }
				value={ phpCode }
				copiedId={ copiedId }
				thisId="php"
				setCopiedId={ setCopiedId }
			/>
			{ showSpp && (
				<>
					<CodeRow
						label={ __( 'Synced Pattern Popups Trigger Code', 'pattern-wrangler' ) }
						value={ getPatternPopupTriggerCode( id ) }
						copiedId={ copiedId }
						thisId="spp-trigger"
						setCopiedId={ setCopiedId }
					/>
					<CodeRow
						label={ __( 'Synced Pattern Popups Trigger Anchor Code', 'pattern-wrangler' ) }
						value={ getPatternPopupTriggerAnchorCode( id ) }
						copiedId={ copiedId }
						thisId="spp-anchor"
						setCopiedId={ setCopiedId }
					/>
					{ syncedPatternPopupsUrl && (
						<p className="description" style={ { marginTop: '8px' } }>
							<a
								href={ `${ syncedPatternPopupsUrl }#how-to-use` }
								target="_blank"
								rel="noreferrer"
							>
								{ __( 'Synced Pattern Popups documentation', 'pattern-wrangler' ) }
							</a>
						</p>
					) }
				</>
			) }
		</PluginDocumentSettingPanel>
	);
};

registerPlugin( 'dlx-pattern-wrangler-code-panel', {
	render: PatternCodePanel,
} );
