import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { userTableState } from "actions/action";

import Head from './head';
import Nav from './nav';

import '../../style/base.less';

@connect((state, props) => ({
    isShow: state.isShowUserTable
}))
export default class App extends Component {
    constructor(props, context) {
        super(props)
        this.state = {

        }
    }
    hideUserTable(e) {
        if(!this.props.isShow) return;
        this.props.dispatch(userTableState(false));
        e.stopPropagation();
    }
    render() {
        return (
            <div onClick={this.hideUserTable.bind(this)}>
                <Head />
                <div>
                    <div className="cont-wrap">{this.props.children}</div>

                    <Nav />
                </div>
            </div>
        )
    }
}