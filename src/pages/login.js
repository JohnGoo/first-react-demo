import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, hashHistory } from "react-router";

import '../style/login.less';

@connect((state, props) => ({}))
export default class Login extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			
		}
	}
	// 组件已经加载到dom中
  	componentDidMount() {
    	// this.props.dispatch(fetchLogin({ currentPage: 1 }))
  	}
  	handleSubmit(e) {
		
  	}
	render() {
		return (
			<div>
				我是一个登陆界面
			</div>
		)
	}
}
