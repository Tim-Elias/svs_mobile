import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import './mobile_disp.css';
import Foto from './foto';
import { withCookies } from 'react-cookie';
import MFoto from './m_foto';

class Screen extends React.Component {

    settings_window = (window) => {
        this.props.set_active_window(window);
    }

    sendpod = (type) => {
        this.props.set_active_window("wait");
        let barcode = this.props.store.disp.foto.split(',').pop();
        const data = {
            userkey: this.props.store.login.userkey,
            num: this.props.store.disp.data.Number,
            comment: this.props.store.disp.comment,
            img: barcode,
            result: type,
        }
        get_data('notdelivered', data).then(
            (result) => {

                const list_data = { userkey: this.props.store.login.userkey };

                get_data('list', list_data).then(
                    (result) => {
                        this.props.cookies.remove('num');
                        this.props.cookies.remove('status');
                        this.props.cookies.remove('window');
                        console.log(result);
                        alert("Данные отправлены!")
                        this.props.set_active_window("m_storage");
                    },
                    (err) => {
                        console.log(err);
                        alert("Ошибка!");
                    }
                );
            },
            (err) => {
                this.props.set_active_window("m_disp");
                alert("Ошибка!");
                console.log(err)
            }
        );
    };

    componentWillUnmount() {
        this.props.reset_data();
    }

    render() {

        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            this.settings_window('m_disp')
            window.history.pushState(null, "", window.location.href);
        }.bind(this);

        return (
            <div>

                <div className="mobile_container">
                    <div className="mobile_del_row">
                        <div className="mobile_del_data_label">Номер накладной:</div>
                        <div className="mobile_del_input">{this.props.store.disp.data.Number}</div>
                    </div>
                    <div className="mobile_del_row">
                        <div className="mobile_del_data_label">Комментарий</div>
                        <input onChange={e => this.props.set_disp_comment(e.target.value)} value={this.props.store.disp.comment} className="mobile_del_input" type="text"></input>
                    </div>
                </div>

                <div className="mobile_container">
                    <button className="mobile_disp_button_item--full mobile_disp_button_item--not" onClick={this.sendpod.bind(this, "ОтказПриДоставке")}>Отказ при доставке</button>
                    <button className="mobile_disp_button_item--full mobile_disp_button_item--yellow" onClick={this.sendpod.bind(this, "ОтменаЗаказа")}>Отмена заказа</button>
                    <button className="mobile_disp_button_item--full mobile_disp_button_item--blue" onClick={this.sendpod.bind(this, "Недозвон")}>Недозвон</button>
                    <button className="mobile_disp_button_item--full mobile_disp_button_item" onClick={this.sendpod.bind(this, "Перенос")}>Перенос</button>
                    <button className="mobile_disp_button_item--full mobile_disp_button_item--not" onClick={this.sendpod.bind(this, "НетПолучателя")}>Нет получателя/Неверный адрес</button>
                </div>
                <MFoto />
                {/* <Foto /> */}
            </div>
        )
    }
};


export default withCookies(connect(
    state => ({
        store: state
    }),
    dispatch => ({
        reset_data: (param) => { dispatch({ type: 'reset_data', payload: param }); },
        set_disp_comment: (param) => { dispatch({ type: 'set_disp_comment', payload: param }); },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }); },
    })
)(Screen));