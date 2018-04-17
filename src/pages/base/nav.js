import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';

const nav = [{
	title:'基础功能',
	id: 1,

	child: [{
		name: '列表',
		url: 'list',
		id: 11
	}, {
		name: '图表',
		url: 'table',
		id: 12
	}, {
		name: '编辑器',
		url: 'edit',
		id: 13
	}]
}, {
	title:'其他',
	id: 2,

	child: [{
		name: '聊天室',
		id: 21
	}]
}]

@connect((state, props) => ({}))
export default class Nav extends Component {
	constructor(props) {
		super(props);
		this.state={
			curId: ''
		}
	}
	bindtapLink(e) {
		this.setState({
			curId: e.currentTarget.id
		})
	}
	render() {
		return (
			<div className="nav-wrap">
				{
					nav.map((value) => {
						return <FirstNav key={value.id} curId={this.state.curId} bindtapLink={this.bindtapLink.bind(this)} child={value.child}>{value.title}</FirstNav>
					})
				}
			</div>
		)
	}
}

// 一级菜单
class FirstNav extends Component {
	constructor(props) {
		super(props);
		this.state={
			navState: false,
			subHeight: 0,
		}
	}
	checkNav(e) {
		this.setState((prevState, state) => {
			return {
				navState: !prevState.navState,
				subHeight: !prevState.navState ? this.props.child.length * 35 : 0
			}
		})
	}
	render() {
		return (
			<div className="">
				<div className="title" onClick={this.checkNav.bind(this)}>
					<span className={this.state.navState ? "span span-on" : "span"}></span>
					<span>{this.props.children}</span>
				</div>
				<ul className="sub-wrap" style={{height: this.state.subHeight + "px"}}>
					{
						this.props.child.map((value) => {
							return <SecondNav key={value.id} curId={this.props.curId} bindtapLink={this.props.bindtapLink} {...value} />
						})
					}
				</ul>
			</div>
		)
	}
}

// 二级菜单
function SecondNav(props) {
	let style = null;
	if(props.id == props.curId) {
		style = {
			backgroundColor: '#0F8EE9',
			color: 'rgba(255, 255, 255 , 1)'
		}
	}
	return (
		<li className="sub-name" id={props.id} onClick={props.bindtapLink}>
			<Link to={'/' + props.url} activeStyle={ style }>{props.name}</Link>
		</li>
	)
}