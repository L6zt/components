const path = require ( 'path' );
const webpack = require ( 'webpack' );
const HtmlWebpackPlugin = require ( 'html-webpack-plugin' );
const ExtractTextPlugin = require ( 'extract-text-webpack-plugin' );
const UglifyJsPlugin = require ( 'uglifyjs-webpack-plugin' );
const PrefetchPolyfillPlugin = require ( 'prefetch-polyfill-webpack-plugin' );
const CompressionPlugin = require ( 'compression-webpack-plugin' );
const isProd = process.env.NODE_ENV === 'production';
const extractScss = new ExtractTextPlugin ( { filename: 'css/[name]-[contenthash].css',disable : !isProd });
const extractVueS = new ExtractTextPlugin ( { filename: 'css/own-[name]-[contenthash].css', disable : !isProd });
const Dm = '/';
const config = {
	devtool : isProd ? false : 'inline-source-map' ,
	entry : {
		app : './src/app' ,
		vendor : ['vue' , 'vue-router' , 'vuex']
	} ,
	output : {
		path : path.resolve ( __dirname , '../dist' ) ,
		filename : isProd ? 'js/[name].[hash].js' : '[name].[hash].js' ,
		publicPath : !isProd ? '/' : Dm
	} ,
	module : {
		rules : [
			{
				test : /\.vue$/ ,
				loader : 'vue-loader' ,
				exclude : /node_modules/ ,
				options : {
					loaders : {
						scss : extractVueS.extract ( {
							fallback : 'vue-style-loader' ,
              use : [{
								loader : 'css-loader' ,
								options : {
									minimize : isProd
								}
							} , {
								loader : 'sass-loader'
							}
							]
						} ) ,
						js : 'babel-loader'
					} ,
					postLoaders : {
						html : 'babel-loader'
					}
				}
			} ,
			{
				test : /\.js/ ,
				// https://github.com/babel/babel-loader#usage
				exclude: /node_modules/,
				use : ['babel-loader']
			} ,
			{
				test : /\.(scss|css)$/ ,
				use : extractScss.extract ( {
					fallback : 'style-loader' ,
          use : [
						{
							loader : 'css-loader' ,
							options : {
								minimize : isProd
							}
						} ,
						{ loader : 'postcss-loader' } ,
						{ loader : 'sass-loader' }
					]
				} )
			} ,
			{
				test : /\.(png|jpg|gif)$/ ,
				use : [
					{
						loader : 'url-loader' ,
						options : {
							limit : 6000 ,
							outputPath : isProd ? 'static/' : '' ,
							publicPath : isProd ? `${Dm}/static/` : false
						}
					}
				]
			} ,
		]
	} ,
	plugins : [
		extractVueS ,
		extractScss ,
		new HtmlWebpackPlugin ( {
			template : path.resolve ( __dirname , '../src/index.html' ) ,
			filename : 'index.html' ,
		} ) ,
		// new webpack.ProvidePlugin ( {
		// 	$ : 'jquery' ,
		// 	jQuery : 'jquery'
		// } ) ,
		new webpack.optimize.CommonsChunkPlugin ( {
			name : 'vendor' ,
			minChunks : Infinity
		} ) ,
		new webpack.optimize.CommonsChunkPlugin ( {
			name : 'manifest' ,
			minChunks : Infinity
		} ) ,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : isProd ? JSON.stringify('production') : JSON.stringify('development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      deepChildren: true,
      children: true
    }),
	] ,
}
if ( isProd ) {
	config.plugins.push (
		new UglifyJsPlugin ( {
			test : /\.(js)$/i
		} )
	)
	config.plugins.push (
		new PrefetchPolyfillPlugin ()
	)
	config.plugins.push (
		new CompressionPlugin ( {
			test : /\.js$|\.css$|\.html$/
		} )
	)
} else {
	config.devServer = {
		historyApiFallback : true ,
		hot: true,
		port : 9000
	}
}
module.exports = config
