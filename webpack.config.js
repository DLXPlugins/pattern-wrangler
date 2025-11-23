const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const path = require( 'path' );
module.exports = ( env ) => {
	return [
		{
			...defaultConfig,
			module: {
				...defaultConfig.module,
				rules: [ ...defaultConfig.module.rules ],
			},
			output: {
				...defaultConfig.output,
				clean: true,
			},
			mode: env.mode,
			devtool: 'production' === env.mode ? false : 'source-map',
			entry: {
				index: '/src/index.js',
				'dlx-pw-preview': './src/js/blocks/plugins/pattern-preview.js',
				'dlx-pw-fancybox': './src/js/fancybox/index.js',
				'dlx-pw-patterns-view': [
					'./src/js/react/views/patterns/index.js',
				],
			},
			resolve: {
				alias: {
					React: path.resolve(
						'node_modules/@wordpress/components/node_modules/react'
					),
					'react-dom': path.resolve(
						'node_modules/@wordpress/components/node_modules/react-dom'
					),
				},
			},
		},
		{
			entry: {
				'dlx-pw-admin': './src/js/react/views/main/index.js',
				'dlx-pw-network-admin-settings':
					'./src/js/react/views/network-settings/index.js',
				'dlx-pw-admin-css': './src/scss/admin.scss',
				'dlx-pw-post-utilities': './src/js/utils/index.js',
				'dlx-pw-admin-utils-css': './src/scss/admin-utils.scss',
			},
			resolve: {
				alias: {
					React: path.resolve(
						'node_modules/@wordpress/components/node_modules/react'
					),
					'react-dom': path.resolve(
						'node_modules/@wordpress/components/node_modules/react-dom'
					),
				},
			},
			mode: env.mode,
			devtool: 'production' === env.mode ? false : 'source-map',
			output: {
				filename: '[name].js',
				sourceMapFilename: '[file].map[query]',
				assetModuleFilename: 'fonts/[name][ext]',
				clean: true,
			},
			module: {
				rules: [
					{
						test: /\.(js|jsx)$/,
						exclude: /(node_modules|bower_components)/,
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-env', '@babel/preset-react' ],
							plugins: [
								'@babel/plugin-transform-class-properties',
								'@babel/plugin-transform-arrow-functions',
							],
						},
					},
					{
						test: /\.scss$/,
						exclude: /(node_modules|bower_components)/,
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
								},
							},
							{
								loader: 'resolve-url-loader',
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true,
								},
							},
						],
					},
					{
						test: /\.css$/,
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
								},
							},
							'sass-loader',
						],
					},
					{
						test: /\.(woff2?|ttf|otf|eot|svg)$/,
						include: [ path.resolve( __dirname, 'fonts' ) ],
						exclude: /(node_modules|bower_components)/,
						type: 'asset/resource',
					},
				],
			},
			plugins: [
				new RemoveEmptyScriptsPlugin(),
				new MiniCssExtractPlugin(),
				new DependencyExtractionWebpackPlugin(),
			],
		},
	];
};
