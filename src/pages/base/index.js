import react, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';

@connect((state, props) => ({}))
export default class App extends Component {
  constructor(props, context) {
    super(props)
    this.state = {

    }
  },
  render() {
    return (
      <div>
				<span>我是滴哟个react界面</span> 
			</div>
    )
  }
}