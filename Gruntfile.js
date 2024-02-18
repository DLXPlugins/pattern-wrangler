module.exports = function( grunt ) {
	grunt.initConfig( {
		compress: {
			main: {
				options: {
					archive: 'dlx-pattern-wrangler.zip',
				},
				files: [
					{ src: [ 'pattern-wrangler.php' ], dest: '/', filter: 'isFile' },
					{ src: [ 'assets/**' ], dest: '/' },
					{ src: [ 'build/**' ], dest: '/' },
					{ src: [ 'dist/**' ], dest: '/' },
					{ src: [ 'php/**' ], dest: '/' },
					{ src: [ 'templates/**' ], dest: '/' },
					{ src: [ 'lib/**' ], dest: '/' },
				],
			},
		},
	} );
	grunt.registerTask( 'default', [ 'compress' ] );

	grunt.loadNpmTasks( 'grunt-contrib-compress' );
};
