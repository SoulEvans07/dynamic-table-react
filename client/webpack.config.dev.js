module.exports = {
	module: {
		rules: [
			{
                test: /\.scss$/,
                loaders: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader'),
                    require.resolve('sass-loader')
                ]
            }
		]
	}
}