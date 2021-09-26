import React from 'react';
import { connect } from 'react-redux';
import { get_data } from './../common/common_modules';
import { Button } from 'semantic-ui-react';
import './mobile_setting.css';
import '../App.css';


class Screen extends React.Component {

    settings_window = (window) => {
        this.props.set_active_window(window);
    }

    

    render() {

        

        return (

            <div className="mobile_setting">
                <div className="mobile_heading">Настройки</div>
               
                <div className="setting_general_data setting_general_data_mobile">
                    <div className="mobile_disp_data_label">Код пользователя:</div>
                    <div className="mobile_disp_data_el">{this.props.store.login.userkey}</div>
                    <div className="mobile_disp_data_label">Имя пользователя:</div>
                    <div className="mobile_disp_data_el">{this.props.store.login.alias}</div>
                </div>

                
            </div>
        );
    }
};

export default connect(
    (state) => ({ store: state }),
    dispatch => ({
        set_user_email: (param) => { dispatch({ type: 'set_user_email', payload: param }) },
        set_user_phone: (param) => { dispatch({ type: 'set_user_phone', payload: param }) },
        set_user_name: (param) => { dispatch({ type: 'set_user_name', payload: param }) },
        set_user_default_send: (param) => { dispatch({ type: 'set_user_default_send', payload: param }) },
        set_user_default_rec: (param) => { dispatch({ type: 'set_user_default_rec', payload: param }) },
        save_changes_user_data: (param) => { dispatch({ type: 'save_changes_user_data', payload: param }) },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
    })
)(Screen);