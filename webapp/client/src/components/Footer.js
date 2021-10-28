import React from 'react';
import { Divider } from 'antd';


class Footer extends React.Component {

	constructor(props) {
		super(props)

	}



	render() {
		return (
			<>
				<div style={{ textAlign: 'center', color: 'grey', borderTop: '1px solid #000', padding: '20px' }}>
					<div>SeeQoolPlaces © 2021</div>
					<div>Created by Emily Connor, Joel Lim, Xulei Qin, and Lana Chebib</div>
				</div>
			</>
		);
	}
}

export default Footer

