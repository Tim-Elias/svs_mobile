import React from 'react'

class Screen extends React.Component {
  render () {
    document.onkeydown = function (event) {}
    return (

      <div className='preloader'>
        Ожидание ...
      </div>

    )
  }
};

export default Screen
