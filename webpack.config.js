const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');    	// 拷贝指定文件至构建目录(output.path)下
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');   	// 构建js时压缩js代码
const path = require('path');

module.exports = {
	entry: './src/app',
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: '[name].js',
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
			}
		]
	},
	resolve: {
	    extensions: ['.js', '.jsx']
	},
	plugins: [
		/*
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
        */
	]
}