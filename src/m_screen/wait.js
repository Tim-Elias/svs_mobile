import React from 'react'

class Screen extends React.Component {
  render () {
    document.onkeydown = function (event) {}
    return (

      <div className='preloader'>
        <div className='preloader__image_animate' />
      </div>

    )
  }
};

export default Screen
