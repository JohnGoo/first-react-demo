/**
*	@description webpack构建参考教程
*	官网：https://doc.webpack-china.org/plugins/html-webpack-plugin/
*	构建流程博客：https://www.cnblogs.com/yincheng/archive/2016/09/07/webpack.html
*	用于提取公共chuck、公共库；CommonsChunkPlugin详情：https://segmentfault.com/a/1190000006808865
*/

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');    			// 拷贝指定文件至构建目录(output.path)下
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');   			// 构建js时压缩js代码
const CleanWebpackPlugin = require('clean-webpack-plugin'); 			// 每次打包自动清理旧的文件

const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin"); 	// 提取并固定公共模块的版本号，防止文件查找错误；配合CommonsChunkPlugin使用
const WebpackChunkHash = require('webpack-chunk-hash'); 				// hash配置
const HtmlWebpackPlugin = require('html-webpack-plugin'); 				// 创建html文件，确保生的js正确导入
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 		// 打包css文件

const path = require('path');

module.exports = {
	entry: './src/app',
	output: {
		path: path.resolve(__dirname, "dist"),
		// publicPath: "/static/build/",     							//webpack-dev-server访问的路径
		filename: '[name].js',
		// chunkFilename: "bundle-[id].js"   							//输出chunk文件名(require.ensure)
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: path.resolve(__dirname, 'src'), 
				exclude: /node_modules/,
				loader: "babel-loader",
			},{
				test: /\.css$/,
				include: path.resolve(__dirname, 'src'),
				use: ["style-loader", "css-loader"],
				// use: ExtractTextPlugin.extract({
				// 	fallback: "style-loader",
				// 	use: [{
				// 		loader: 'css-loader',
				// 		options: {
				// 			minimize: true  // 压缩css代码
				// 		}
				// 	}]
				// })
			}
		]
	},
	resolve: {
	    extensions: ['.js', '.jsx']
	},
	devtool: 'inline-source-map',
	devServer: {												// 配置热更新参数
      	contentBase: './dist',
      	hot: true
    },
	plugins: [
		/*
		new ExtractTextPlugin('styles.css'),  					// 打包css文件
		new CleanWebpackPlugin(['dist']),
		new webpack.optimize.DedupePlugin(),        			// 一些依赖库可能存在重复的文件，此方法用于去重
		new CopyWebpackPlugin([
	     	{ from: './src/main.css', to: 'main.css' }
	    ]),
	    new UglifyJsPlugin(),
	    new webpack.DefinePlugin({								// 配置DefinePlugin，这里面的标识就相当于全局变量
	    		'process.env': {
        			NODE_ENV: JSON.stringify('production')
      			}
	    }),
	    new webpack.optimize.CommonsChunkPlugin({            	// 用于提取公共chuck、公共库；详情：https://segmentfault.com/a/1190000006808865
            name: 'common', // 注意不要.js后缀
            chunks: ['main','user','index']
        }),
        new WebpackChunkHash(),
        new HtmlWebpackPlugin({
    		title: 'Output Management'
   		}),
        new ChunkManifestPlugin({
	       	filename: "chunk-manifest.json",
       		manifestVariable: "webpackManifest"
	    }),
        */
	]
}