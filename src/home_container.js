import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_data } from './common/common_modules';

import { withCookies } from 'react-cookie';
import MContent from './m_screen/m_content';
import MLogin from './m_screen/m_login';

class Screen extends Component {

    
  render() {

    if(!this.props.store.login.logged){
       const username = this.props.cookies.get('username') 

        if(username!==undefined){
            //console.log('un')
            const authdata = {
                username: this.props.cookies.get('username'),
                pass: this.props.cookies.get('passkey') 
            };

            //console.log(authdata)
            get_data('autorization', authdata).then(
                (result) => {
                  //console.log(result)
                  this.props.login(result);
                  //this.get_list(result.userkey);
                  this.props.cookies.set('userkey', result.userkey, { maxAge: 30 })
                },
                (err) => { 
                    console.log(err)
                    this.props.cookies.remove('username')
                    this.props.cookies.remove('passkey')
                 }
            );
        } 
        
    }
    
    
    return (
    
          <div>
            {!this.props.store.login.logged ? (<MLogin />) : (<MContent />)}
          </div>
      
    );
  }
}

export default withCookies(connect(
  (state, ownProps) => ({store: state, cookies: ownProps.cookies}),
  dispatch => ({
    login: (param) => { dispatch({ type: 'LOGIN', payload: param }) },
   
})
  
)(Screen));