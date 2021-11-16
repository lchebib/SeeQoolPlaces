import React from 'react';
import { Button } from 'antd';

class Button extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Button type='primary' shape='round' size='medium'
				style={{
					marginLeft: '30px',
					marginTop: '30px',
					wordWrap: 'break-word',
					border: 'none',
					background: 'black',
					color: 'white'
				}}>
				{this.props.text}
			</Button>
		);
	}
} export default Button