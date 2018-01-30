const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function join(relatedPath) {
  	return path.join(__dirname, relatedPath)
}

module.exports = {
	entry: {
		app: join('./src/App.js')
	},
	output: {
		path: './dist',
		filename: '[name].js',
		chunkFilename: 'chunks/[name].js',
	}
	resolve: {
	    extensions: ['.js', '.json', 'css'],
	    alias: {
		    actions: join('src/redux/actions'),
		    store: join('src/redux/store'),
		    reducers: join('src/redux/reducers'),
		    middleware: join('src/redux/middleware'),
		    route: join('src/route'),
		    style: join('src/style'),
		    images: join('src/images'),
	    },
  	},
  	module: {
  		rules: [{
  			test: /\.js(x)?$/,
			loader: "babel-loader",
  			include: path.resolve(__dirname, 'src'), 
			exclude: /node_modules/,
  		}, {
  			test: /\.css$/,
	        loader: ExtractTextPlugin.extract({
	            fallback: 'style-loader',
	            use: [
	            	{ loader: 'css-loader', options: { sourceMap: true } }
	            ]
	        }),
  			include: path.resolve(__dirname, 'src'), 
			exclude: /node_modules/,
  		}, {
	        test: /\.less$/,
	        loader: ExtractTextPlugin.extract({
	            fallback: 'style-loader',
	            use: [
	            	{ loader: 'css-loader', options: { sourceMap: true } },
	            	{ loader: 'less-loader', options: { sourceMap: true } }
	            ]
	        }),
      	}, {
	        test: /\.scss$/,
	        loader: ExtractTextPlugin.extract({
	            fallback: 'style-loader',
	            use: [
	            	{ loader: 'css-loader', options: { sourceMap: true } },
	            	{ loader: 'scss-loader', options: { sourceMap: true } }
	            ]
	        }),
      	}, {
	        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	        loader: 'url-loader',
	        options: {
	          	limit: 8192,
	          	name: 'img/[name].[hash:4].[ext]'
	        }
      	}, {
	        test: /\.(woff|eot|ttf|svg|gif)$/,
	        loader: 'url-loader',
	        options: {
	          	limit: 8192,
	          	name: 'font/[name].[hash:4].[ext]'
	        }
      	}]
  	},
  	plugin: [
  		// 提取css
	    new ExtractTextPlugin('style.[hash:4].css'),
	    // 将打包后的资源注入到html文件内    
	    new HtmlWebpackPlugin({
	      	template: resolve('./src/index.html'),
	    }),
	    // 打包公共模块
	    new webpack.optimize.CommonsChunkPlugin({
		    name: 'client', // 入口文件名
		    filename: 'common.bundle.js', // 打包后的文件名
		    minChunks: function (module, count) {
		        return module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(resolve('../node_modules')) === 0
		    }
	    }),
	    new webpack.optimize.CommonsChunkPlugin({
	      	async: 'async-common',
	      	minChunks: 3,
	    }),
  	]
};