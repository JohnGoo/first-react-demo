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
			isHidden: true,
			fromData: {}
		}
	}
	// 组件已经加载到dom中
  	componentDidMount() {
    	// this.props.dispatch(fetchLogin({ currentPage: 1 }))
  	}
  	handleName(e) {
		this.setState({
			fromData: Object.assign({}, this.state.fromData, {name: e.target.value})
		})
  	}
  	handlePassword(e) {
		this.setState({
			fromData: Object.assign({}, this.state.fromData, {password: e.target.value})
		})
  	}
  	handleSubmit(e) {
  		console.log('submit', this.state.fromData);
		e.preventDefault();

  		sessionStorage.setItem('token', 'dupi');
  		hashHistory.push('/');
  	}
  	checkOut(e) {
		this.setState((prevState, state) => {
			return {isHidden: !prevState.isHidden}
		})
		e.stopPropagation();
	}
	hidden(e) {
		this.setState({
			isHidden: true
		})
		e.stopPropagation();
	}
	render() {
		return (
			<div className="login-wrap" onClick={this.hidden.bind(this)}>
				<Moreweb checkOut={this.checkOut.bind(this)} state={this.state.isHidden} />
				<div className="cont">
					<div className="container">
						<div className="logo">LOGO</div>
						<form className="form" onSubmit={this.handleSubmit.bind(this)}>
							<input name="username" type="text" placeholder="请输入用户名" onChange={this.handleName.bind(this)} />
							<input name="password" type="password" placeholder="请输入密码" onChange={this.handlePassword.bind(this)} />
							<button type="submit"></button>
						</form>
						<div className="find-pw">找回密码</div>
					</div>
				</div>
			</div>
		)
	}
}

function Moreweb(props) {
	let website = [
		{	
			name: '站点1',
			href: '',
			key: 1
		},
		{	
			name: '站点2',
			href: '',
			key: 2
		},
		{	
			name: '站点3',
			href: '',
			key: 3
		},
		{	
			name: '站点4',
			href: '',
			key: 4
		},
		{	
			name: '站点5',
			href: '',
			key: 5
		}
	]
	return (
		<div className="more-web">
			<div className={props.state ? 'show-more' : 'show-more on'} onClick={props.checkOut}>企业旗下网站</div>
			<ul className={props.state ? 'show-more-ul hide' : 'show-more-ul'}>
				{
					website.map((item) => {
						return (
							<Li {...item} />
						)
					})
				}
			</ul>
		</div>
	)
	
}

function Li(props) {
	return (
		<li><a className="link" href={props.href}>{props.name}</a></li>
	)
}