import React from 'react';
import { connect } from 'react-redux';
import './mobile.css'; 
import './mobil_menu.css';
import { withCookies } from 'react-cookie';
import { get_data } from './../common/common_modules';

class Screen extends React.Component {

  

    settings_window = (window) => {
        const list_data = { userkey: this.props.store.login.userkey }
        this.props.set_active_window(window);
        if (window === 'storage_reciept') {
            get_data('storagedata', list_data).then(
                (result) => {
                    this.props.storage_reciept_set_storage(result.storage);
                    this.props.storage_reciept_set_zone_list(result.zone_list);
                    this.props.set_active_window(window);
                },
                (err) => {
                    console.log(err)
                    this.props.set_active_window(window)
                }

            );
        } else if (window === 'm_send_manifest') {
            this.props.set_active_window("wait");
            const list_data = { userkey: this.props.store.login.userkey };

            get_data('list', list_data).then(
                (result) => {
                    this.props.set_list_storage(result);
                    this.props.set_active_window(window);
                    this.props.set_search_storagre("");
                },
                (err) => { console.log(err) }
            );
        } else if (window === 'm_storage') {
            this.props.set_active_window("m_storage");
            
        }
    }

    logout = () => {
        this.props.cookies.remove('username')
        this.props.cookies.remove('passkey')
        this.props.set_active_window(null);
        this.props.logout();
    };

    render() {

        return (
            <nav className="mobile_menu">
                <div className="mobile_container">
                    <ul>
                        <li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.settings_window.bind(this, 'm_storage')}>Доставки и Заявки</button></li>
                        {/* {this.props.store.login.create_disp ? (<li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.settings_window.bind(this, 'm_disp_template')}>Создать накладную</button></li>) : (null)} */}
                        <li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.settings_window.bind(this, 'm_reciept')}>Получить со склада</button></li>
                        {/* {this.props.store.login.original_data.courier || this.props.store.login.disp_map ? (null) : (<li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.settings_window.bind(this, 'm_get_manifest')}>Входящие манифесты</button></li>) } */}
                        {/* {this.props.store.login.original_data.courier || this.props.store.login.disp_map ? (null) : (<li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.settings_window.bind(this, 'm_send_manifest')}>Отправка манифеста</button></li>) } */}
                        {/* {this.props.store.login.original_data.driverexpeditor ? (<li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.settings_window.bind(this, 'm_send_partner')}>Передать партнеру</button></li>) : (null)} */}
                        {/* {this.props.store.login.original_data.courier || !this.props.store.login.disp_map ? (null) : (<li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.settings_window.bind(this, 'storage_reciept')}>Приемка на склад</button></li>)} */}
                        {/* {this.props.store.login.disp_map ? (<li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.settings_window.bind(this, 'm_finance')}>Финансы</button></li>) : (null)} */}
                        {/* <li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.settings_window.bind(this, 'm_calc_price')}>Рассчитать стоимость</button></li> */}
                        <li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.settings_window.bind(this, 'setting')}>Настройки</button></li>
                        {/* <li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.mobile_version.bind(this)}>Web Версия</button></li> */}
                        <li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.logout.bind(this)}>Выйти</button></li>
                        {/* <li className="mobile_menu_item"><button className="mobile_menu_button" onClick={this.settings_window.bind(this, 'position')}>test</button></li> */}
                    </ul>
                </div>
            </nav>
        )
    }
};


export default withCookies(connect(
    (state, ownProps) => ({ store: state, cookies: ownProps.cookies }),
    dispatch => ({
        set_check_data: (param) => { dispatch({ type: 'set_check_data', payload: param }); },
        web_active: (param) => { dispatch({ type: 'M_ACTIVE', payload: param }) },
        logout: () => { dispatch({ type: 'LOGOUT' }) },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }); },
        use_width: (param) => { dispatch({ type: 'set_use_width', payload: param }); },
        set_list_storage: (param) => { dispatch({ type: 'set_list_storage', payload: param }) },
        set_search_storagre: (param) => { dispatch({ type: 'set_search_storagre', payload: param }) },

        storage_reciept_set_zone_list: (param) => { dispatch({ type: 'storage_reciept_set_zone_list', payload: param }) },
        storage_reciept_set_storage: (param) => { dispatch({ type: 'storage_reciept_set_storage', payload: param }) },
        set_list_get_manifest: (param) => { dispatch({ type: 'set_list_get_manifest', payload: param }) },
    })
)(Screen));
