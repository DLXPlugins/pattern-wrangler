/**
 * Prettier config aligned with WordPress JS style and this repo’s ESLint
 * (see .eslintrc.json: tabs, always-multiline commas, semicolons).
 *
 * Prettier may still insert a few spaces for alignment inside lines; ESLint uses
 * no-mixed-spaces-and-tabs "smart-tabs" so that stays valid with tab indentation.
 */
module.exports = {
	useTabs: true,
	tabWidth: 4,
	printWidth: 80,
	singleQuote: true,
	trailingComma: 'all',
	semi: true,
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'always',
	endOfLine: 'lf',
};
