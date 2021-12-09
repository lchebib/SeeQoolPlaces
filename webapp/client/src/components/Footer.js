import React from 'react';
import '../style/style.css'

/**
 * @name Footer
 * @description Website footer
 * 
 * APPEARS IN
 * All pages except landing page
 */

class Footer extends React.Component {

  render() {
    return (
      <>
        <div className='footer'>
          <div>SeeQoolPlaces © 2021</div>
          <div>Created by Emily Connor, Joel Lim, Xulei Qin, and Lana Chebib</div>
        </div>
      </>
    );
  }
}

export default Footer

