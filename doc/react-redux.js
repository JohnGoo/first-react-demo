import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types'
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

/**
 * @desc '容器组件'获取应用的State（store）映射到'ui组件'的Props
 * @param ownProps => '容器组件'的Props；state => 应用的State
 * @return  返回'ui组件'的Props的属性集合
 */
const mapStateToProps = (state, ownProps) => {
	return {

	}
}

/**
 * @desc 'ui组件'上的方法，推送（dispatch）action给store；方法也是通过Props对象从'容器组件'传递给'ui组件',因而写'ui组件'需接收方法。
 * @param ownProps => '容器组件'的Props；dispatch => 框架内部定义的dispatch方法
 * @return  返回'ui组件'的Props的方法集合
 */
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
	      	dispatch({
	        	// type: 'SET_VISIBILITY_FILTER',
	        	// filter: ownProps.filter
	      	});
	    }
	}
}

/**
 * @desc 生成'容器组件'，构建'容器组件'与'ui组件'的父子关系；（通过Props对象传递数据）
 */
const App = connect(
  	mapStateToProps,
  	mapDispatchToProps
)(Counter);