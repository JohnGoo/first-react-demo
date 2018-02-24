import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, hashHistory } from "react-router";

// 后续了解：rc-form
// import { Form, Input, Button } from "./components/component";

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
  	handleName(e) {
		this.setState({
			name: e.target.value
		})
  	}
  	handlePassword(e) {
		this.setState({
			password: e.target.value
		})
  	}
  	handleSubmit(e) {
  		console.log('submit', this.state);
		e.preventDefault();
  	}
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input name="username" type="text" placeholder="请输入用户名" onChange={this.handleName.bind(this)} />
					<input name="password" type="password" placeholder="请输入密码" onChange={this.handlePassword.bind(this)} />
					<button type="submit">提交</button>
				</form>
			</div>
		)
	}
}
