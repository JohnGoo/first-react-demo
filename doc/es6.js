import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
*	配置过程中的ES6语法理解：
*/


/**
*	ES6语法新增了修饰器@语法；
*	此处使用了其修饰类功能，
*	修饰器@后是一个函数，即connect((state, props) => ({}))返回的函数，修饰的最终效果是：connect((state, props) => ({}))(App)，刚好符合connect的使用。
*
*	@decorator
*	class A {}
*
*	// 等同于
*
*	class A {}
*	A = decorator(A) || A;
*/
@connect((state, props) => ({}));
export default class App extends Component {

}