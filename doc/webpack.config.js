/**
*	@description webpack构建参考教程
*	官网：https://doc.webpack-china.org/plugins/html-webpack-plugin/
*	构建流程博客：https://www.cnblogs.com/yincheng/archive/2016/09/07/webpack.html
*	用于提取公共chuck、公共库；CommonsChunkPlugin详情：https://segmentfault.com/a/1190000006808865
*/

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');    			// 拷贝指定文件至构建目录(output.path)下
const CleanWebpackPlugin = require('clean-webpack-plugin'); 			// 每次打包自动清理旧的文件

const WebpackChunkHash = require('webpack-chunk-hash'); 				// hash配置
const HtmlWebpackPlugin = require('html-webpack-plugin'); 				// 创建html文件，确保生成的js正确导入
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
				// use: ["style-loader", "css-loader"],
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
						loader: 'css-loader',
						options: {
							minimize: true  // 压缩css代码
						}
					}]
				})
			}
		]
	},
	resolve: {															// 解析模块时的选项
	    extensions: ['.js', '.jsx', 'less', 'css', 'scss']				// 自动解析确定的扩展(能够使用户在引入模块时不带扩展)
	},
	context: __dirname, 												// string（绝对路径！）
	devtool: 'cheap-module-eval-source-map',							// SourceMap打包嵌入方式（开发环境推荐：cheap-module-eval-source-map；生产环境推荐：cheap-module-source-map）
	devServer: {														// 配置热替换参数
      	contentBase: './dist',
      	hot: true
    },
	plugins: [
	/**
	*	打包css文件
   	*/
		new ExtractTextPlugin('styles.css'), 
	

   	/**
	*	每次打包，清理上传生成的文件
   	*/
		new CleanWebpackPlugin(['dist']),
	

	/**
	*	一些依赖库可能存在重复的文件，此方法用于去重
   	*/
		new webpack.optimize.DedupePlugin(),
	

	/**
	*	文件复制
   	*/   	
   	
		new CopyWebpackPlugin([
	     	{ from: './src/main.css', to: 'main.css' }
	    ]),
	


   	/**
	*	文件压缩
   	*/  
		new webpack.optimize.UglifyJsPlugin({ minimize: true }),
	


	/**
	*	配置DefinePlugin，这里面的标识就相当于全局变量
   	*/
	    new webpack.DefinePlugin({
    		'process.env': {
    			NODE_ENV: JSON.stringify('production')
  			}
	    }),
	


	/**
	*	CommonsChunkPlugin用于提取公共chuck、公共库；详情：https://segmentfault.com/a/1190000006808865
	*	注意：
	*   1、如 name: ["common","jquery","vue","load"]
	*		（1）从name中第二个模块开始打包entry中对应的模块，按name顺序从左到右依次打包
	*		（2）name中最后一个块使用时必须先引用，（1）打包完成后打包
	*		（3）打包entry中不在name中的模块，（2）打包完成后按entry中的顺序依次打包
	*		（4）符合引用次数(minChunks)的模块打包到name参数的数组的第一个块里（common），最后打包
	*	2、如 chunks: ['main','user','index']
	*		（1）entry中'main','user','index'都引用的模块才会被打包的到公共模块
	*	3、minChunks：超过引用次数的才会打包至公共模板
	*	4、filename: 配置则以此为输出文件名字，并忽略以name为输出文件名
	*/
	    new webpack.optimize.CommonsChunkPlugin({ 
            name: 'common', 
            chunks: ['main','user','index'],
            minChunks: 2
        }),
    


   	/**
	*	启用chunkHash
   	*/
    	new WebpackChunkHash(),


	/**
	*	将打包后的资源注入到html文件内   
   	*/
        new HtmlWebpackPlugin({
    		title: 'Output Management'
   		}),


   	/**
   	*	CommonsChunkPlugin打包出的外部库hash(entry中指定的库)不受业务代码的变化影响（hash 都保持一致），推荐生产中使用
   	*/
		new webpack.HashedModuleIdsPlugin(),
    
    

    /**
    *	HMR => 编辑工具代码修改保存后，浏览器实时更新
	*	启用HMR（永远不要在生产环境下启用 HMR），启用它的接口将被暴露在 module.hot 属性下面。
	* 	module.hot属性下的接口accept配置后可监听某个模块更新，并设至回调
    */
    	new webpack.HotModuleReplacementPlugin(),
	]
}




/** .babelrc配置说明(Babel 7)
 *	重要的配置:
 *	(1)@babel/core 															=> Babel compiler core(Babel编译器核心)；支持对JS语法进行编译；
 *	(2)@babel/preset-env												=> 一个智能预设，允许您使用最新的JavaScript，而无需微观管理您的目标环境需要哪些语法转换；
 *																								 不支持 stage-x 插件；
 *																								 作用：接收指定的目标环境，检查环境支持的映射，编译插件列表并将其传递给Babel；
 *																								 重要options：1、targets：预置编译环境（默认是@babel/preset-es'最新'）,即编译成的代码需要在怎样的环境运行；
 *																														  2、useBuiltIns：见（*1*），配合@babel/polyfill对API进行编译。
 *	(3)@babel/polyfill													=> 配置可对API进行编译；配合@babel/preset-env useBuiltIns使用；
 *	(4)@babel/plugin-transform-runtime					=> 可以重复使用Babel注入的帮助程序代码来节省代码；
 *																								 在开发时引入；编译代码时，引入配合@babel/runtime使用
 *																								 配置options属性corejs为2，需配合@babel/runtime-corejs2使用，解决 Promise、Symbol 等全局变量污染的问题
 *  (5)@babel/runtime(@babel/runtime-corejs2)		=> 在运行时引入；代码运行时，引入帮助对象以减少代码
 *	(6)@babel/preset-react											=> 配置可对react-jsx进行编译；
 *
 *
 *
 *	(*1*)"@babel/env" => option => "useBuiltIns"("usage"/"entry"/false)
 *			"usage": 无需如import("@babel/polyfill");根据指定环境版本、文件不兼容语法引入(按需)
 *			"entry"：需import("@babel/polyfill");根据指定环境版本引入
 *			false： import("@babel/polyfill")时会将库里面的代码全部打包
 */