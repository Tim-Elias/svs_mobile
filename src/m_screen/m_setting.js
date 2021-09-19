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

    save_changes_user_data = () => {
        const data = {
            userkey: this.props.store.login.userkey,
            phone: this.props.store.login.phone,
            email: this.props.store.login.email,
            name: this.props.store.login.alias,
            default_send: this.props.store.login.default_send,
            default_rec: this.props.store.login.default_rec,

        }

        get_data('edituserdata', data).then(
            (result) => {
                this.props.save_changes_user_data(result)
                this.props.modules.set_modal_show(true)
                this.props.modules.set_modal_text("Данные успешно сохранены")
                this.props.modules.set_modal_header('Успешно')
            },
            (err) => {
                console.log("err")
                console.log(err)
            }
        );

    }

    render() {

        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            this.settings_window('Mmenu')
            window.history.pushState(null, "", window.location.href);
        }.bind(this);

        document.onkeydown = function (event) { }
        let default_send_template = {}
        let default_rec_template = {}

        if (this.props.store.login.default_send !== '0') {
            default_send_template = this.props.store.upload_manifest.disp_template_list.find(el => el.Key === this.props.store.login.default_send)
        }

        if (this.props.store.login.default_rec !== '0') {
            default_rec_template = this.props.store.upload_manifest.disp_template_list.find(el => el.Key === this.props.store.login.default_rec)
        }

        return (

            <div className="mobile_setting">
                <div className="mobile_heading">Настройки</div>
                <div className="disp_Number">
                    <div>{this.props.store.login.email !== this.props.store.login.original_data.email
                        || this.props.store.login.alias !== this.props.store.login.original_data.username
                        || this.props.store.login.default_send !== this.props.store.login.original_data.default_send
                        || this.props.store.login.default_rec !== this.props.store.login.original_data.default_rec
                        || this.props.store.login.phone !== this.props.store.login.original_data.phone ? (
                            <Button style={{ margin: '0 10px' }} onClick={this.save_changes_user_data.bind(this)}>Сохранить изменения</Button>
                        ) : (
                            <Button style={{ margin: '0 10px' }} disabled>Сохранить изменения</Button>
                    )}</div>
                </div>
                <div className="setting_general_data setting_general_data_mobile">
                    <div className="mobile_disp_data_label">Код пользователя:</div>
                    <div className="mobile_disp_data_el">{this.props.store.login.userkey}</div>
                    <div className="mobile_disp_data_label">Имя пользователя:</div>
                    {/* <div className="mobile_disp_data_el"><input maxLength="100" className="create_disp_data_input" onChange={e => this.props.set_user_name(e.target.value)} value={this.props.store.login.alias} type="text" placeholder="введите имя пользователя..." /></div> */}
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