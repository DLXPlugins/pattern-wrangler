const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const path = require( 'path' );
module.exports = ( env ) => {
	return [
		{
			...defaultConfig,
			module: {
				...defaultConfig.module,
				rules: [ ...defaultConfig.module.rules ],
			},
			mode: env.mode,
			devtool: 'production' === env.mode ? 'source-map' : false,
		},
		{
			entry: {
				'dlx-pw-admin': './src/js/react/views/main/index.js',
				'dlx-pw-admin-license': './src/js/react/views/license/index.js',
				'dlx-pw-admin-css': './src/scss/admin.scss',
			},
			resolve: {
				alias: {
					react: path.resolve( 'node_modules/react' ),
				},
			},
			mode: env.mode,
			devtool: 'production' === env.mode ? 'source-map' : false,
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
			plugins: [ new RemoveEmptyScriptsPlugin(), new MiniCssExtractPlugin() ],
		},
	];
};
