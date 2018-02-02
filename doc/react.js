/**
*	《本文本是关于react的理解》(个人理解，持续纠错)
*	
*/


import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, hashHistory } from "react-router";

/****************************1、类组件创建问题******************************/
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




/***************************2、父组件向子组件传递回调的问题******************************/
class LoggingButton extends React.Component {
    handleClick() {
        console.log('this is:', this);
    }
    render() {
        return (
        	// Button子组件
            <Button click={(e) => this.handleClick(e)}>
        		Click me
      		</Button>
        );
    }
}
// onClick={(e) => this.handleClick(e)}绑定方式的不合理性：
// 官方解释：使用这个语法有个问题就是每次 LoggingButton 渲染的时候都会创建一个不同的回调函数。
//			 在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些
//			 组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法
//			 来避免这类性能问题。
// 个人理解：每次 LoggingButton 渲染的时候都会创建一个不同的回调函数(即onClick指向的匿名函数)，
//			 这时Button子组件的props发生了变化，引发子组件的重新渲染。




/****************************3、ref用法总结******************************/
// 1、为 DOM 元素添加 Ref；可以获取到对应的DOM对象
<input type="text" ref={(input) => { this.textInput = input; }} />

// 2、为类组件添加 Ref；获取已经加载的 React 实例（模拟点击效果）
// 注意：组件必须为class构造，不能使用构造函数
<CustomTextInput ref={(input) => { this.textInput = input; }} />

// 3、父组件通过传递回调获取子组件内的DOM对象：props传递、获取
<CustomTextInput inputRef={el => this.inputElement = el}