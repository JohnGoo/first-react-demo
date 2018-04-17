import React, { Component } from 'react';
import { connect } from "react-redux";
import { IndexLink } from "react-router";
import { checkoutUserTable } from "actions/action";

@connect((state, props) => ({
	isShow: state.isShowUserTable
}))
export default class Head extends Component {
	constructor(props) {
		super(props);
	}
	checkoutUserTable(e) {
		this.props.dispatch(checkoutUserTable());
		e.stopPropagation();
	}
	hideUserTable() {
		this.setState({
			showTable: false
		})
	}
	render() {
		let style = {
			backgroundColor: '#FFF',
			color: '#333'
		}
		return (
			<div className="head-wrap">
				<div className="logo"><IndexLink to="/">LOGO</IndexLink></div>
				<div className="username" onClick={this.checkoutUserTable.bind(this)}><a href="javascript: void(0);" style={this.props.isShow ? style : {}}>username</a></div>
				<Table isShow={this.props.isShow} />
			</div>
		)
	}
}

function Table (props) {
	const tab = [{
		name: '我的足记',
		url: ''
	},{
		name: '我的资料',
		url: ''
	},{
		name: '退出',
		url: ''
	}]
	return (
		<ul className={!props.isShow ? "table hide" : "table"}>
			{
				tab.map((value, index) => {
					return (
						<li key={index}><a href="javascript: void(0);">{value.name}</a></li>
					)
				})
			}
		</ul>
	)
}