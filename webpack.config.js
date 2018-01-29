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

const WebpackChunkHash = require('webpack-chunk-hash'); 				// hash配置
const HtmlWebpackPlugin = require('html-webpack-plugin'); 				// 创建html文件，确保生的js正确导入
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 		// 打包css文件

const path = require('path');

module.exports = {
	entry: {
		main: './src/main'
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		// publicPath: "/",     										// webpack-dev-server访问的路径
		filename: '[name].js',											// entry文件(在entry配置)
		// chunkFilename: "bundle-[id].js"   							// 非entry文件，输出chunk文件名(如require.ensure按需加载，没有在entry配置)
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
	resolve: {													// 解析模块时的选项
	    extensions: ['.js', '.jsx', 'less', 'css', 'scss']						// 自动解析确定的扩展(能够使用户在引入模块时不带扩展)
	},
	context: __dirname, 										// string（绝对路径！）
	devtool: 'cheap-module-eval-source-map',					// SourceMap打包嵌入方式（开发环境推荐：cheap-module-eval-source-map；生产环境推荐：cheap-module-source-map）
	devServer: {												// 配置热替换参数
      	contentBase: './dist',
      	hot: true
    },
	plugins: [
   	/*
		new ExtractTextPlugin('styles.css'),  					// 打包css文件
	*/
   	
		new CleanWebpackPlugin(['dist']),						// 每次打包，清理上传生成的文件
	
   	/*
		new webpack.optimize.DedupePlugin(),        			// 一些依赖库可能存在重复的文件，此方法用于去重
	*/
   	/*
		new CopyWebpackPlugin([
	     	{ from: './src/main.css', to: 'main.css' }
	    ]),
	*/
   	/*
	    new UglifyJsPlugin(),
	*/
   	/*
	    new webpack.DefinePlugin({								// 配置DefinePlugin，这里面的标识就相当于全局变量
	    		'process.env': {
        			NODE_ENV: JSON.stringify('production')
      			}
	    }),
	*/
   	/*
	    new webpack.optimize.CommonsChunkPlugin({            	// 用于提取公共chuck、公共库；详情：https://segmentfault.com/a/1190000006808865
            name: 'common', 									// 注意不要.js后缀(webpack用插件CommonsChunkPlugin进行打包的时候，将符合引用次数(minChunks)的模块打包到name参数的数组的第一个块里（chunk）,然后数组后面的块依次打包(查找entry里的key,没有找到相关的key就生成一个空的块)，最后一个块包含webpack生成的在浏览器上使用各个块的加载代码，所以页面上使用的时候最后一个块必须最先加载)
            chunks: ['main','user','index'],					// 只有'main','user','index'（在entry中存在对应的多入口文件名）都引用的模块才会被打包的到公共模块
            minChunks: 2										// 超过引用次数的才会打包至公共模板
        }),
    */
   	/*
        new WebpackChunkHash(),
    */
   	
        new HtmlWebpackPlugin({
    		title: 'Output Management'
   		}),
   	
   	/*
	    new webpack.HashedModuleIdsPlugin(),					// CommonsChunkPlugin打包出的外部库hash(entry中指定的库)不受业务代码的变化影响（hash 都保持一致）
    */
	]
}