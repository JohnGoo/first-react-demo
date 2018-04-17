import React, { Component } from 'react';
import { fetchList } from 'actions/action';
import { connect } from 'react-redux';

@connect((state, props) => ({
	list: state.fetchList
}))
export default class List extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.dispatch(fetchList({}, (resp) => {
			// console.dir(this.props.list);
			console.log(resp);
		}));
	}
	render() {
		
		return (
			<div>我是一个List页面</div>
		)
	}
}