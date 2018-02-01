/**
*	《本文本是关于react的理解》
*	个人理解，持续纠错
*/


import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, hashHistory } from "react-router";

@connect((state, props) => ({}))
export default class App extends Component {
	// Q:创建组件类时，为什么能够通过props传递属性？（组件能够通过this.props[*]获取到属性值）
	// A:创建的组件类是在其实例化过程中传入的props的，其在构造器（constructor）的定义方式是继承自Component类。
	//   使用的this.props[*]相当于使用形参props。

	// Q:this.setState()的理解。（http://blog.csdn.net/u013510838/article/details/59486772）
	// A:该方法继承自Component类，this.setState方法会更新this.state的属性，并更新组件
	constructor(props, context) {
		super(props);
		this.state = {
			
		}
	}
	render() {
		return (
			<div>我是一个界面</div>
		)
	}
}

