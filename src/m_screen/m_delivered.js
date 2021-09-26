import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import './mobile_delivery.css';
import './mobile_disp.css';
// import './popup.css';
// import Foto from './foto';
import Wait from "./wait";
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
            date: this.props.store.disp.delivery_date, 
            time: this.props.store.disp.delivery_time, 
          
            comment: this.props.store.disp.comment, 
            rec: this.props.store.disp.FIO_Customer, 
            
            img: barcode,
            
        }
        get_data('delivered', data).then(
            (result) => {

                const list_data = { userkey: this.props.store.login.userkey };

                get_data('list', list_data).then(
                    (result) => {
                        this.props.cookies.remove('num');
                        this.props.cookies.remove('status');
                        this.props.cookies.remove('window');
                        this.props.set_popup_message("Данные отправлены!");
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

    receipt = () => {
        this.props.set_popup(!(this.props.store.disp.popup));
    }
    
    

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(file);
        reader.onloadend = () => {
            this.props.take_foto(reader.result);
        }
        reader.readAsDataURL(file);
    }

    componentDidMount() {
     


        const today = new Date()
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        const y = today.getFullYear();

        if (mm < 10) { mm = '0' + mm }
        if (dd < 10) { dd = '0' + dd }

        const date = y + '-' + mm + '-' + dd;
        this.props.set_disp_date(date);

        let H = today.getHours();
        let M = today.getMinutes();

        if (H < 10) { H = '0' + H }
        if (M < 10) { M = '0' + M }

        const time = H + ':' + M;
        this.props.set_disp_time(time);

    }

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
               


                {this.props.store.general.active_loader ? (<Wait />) : (
                <div>
                    <div className="mobile_disp_button">
                        <button className="mobile_disp_button_item" onClick={this.sendpod.bind(this, false)}>Доставленно</button>
                        
                    </div>

                   

                
                    
                    {/* <button className="mobile_disp_button_item mobile_disp_button_item--blue" disabled={this.props.store.disp.print_check_disabled}>Печать чека</button> */}

                    <div className="mobile_container">
                        <div className="mobile_del_row">
                            <div className="mobile_del_data_label">Номер накладной:</div>
                            <div className="mobile_del_input">{this.props.store.disp.data.Number}</div>
                        </div>
                        
                        <div className="mobile_del_row">
                            <div className="mobile_del_data_label">Дата доставки</div>
                            <input onChange={e => this.props.set_disp_date(e.target.value)} value={this.props.store.disp.delivery_date} className="mobile_del_input" type="date"></input>
                        </div>

                        <div className="mobile_del_row">
                            <div className="mobile_del_data_label">Время доставки</div>
                            <input onChange={e => this.props.set_disp_time(e.target.value)} value={this.props.store.disp.delivery_time} className="mobile_del_input" type="time"></input>
                        </div>
                       
                        <div className="mobile_del_row">
                            <div className="mobile_del_data_label">ФИО получателя</div>
                            <input onChange={e => this.props.set_disp_FIO(e.target.value)} value={this.props.store.disp.FIO_Customer} className="mobile_del_input" type="text"></input>
                        </div>

                      

                        <div className="mobile_del_row">
                            <div className="mobile_del_data_label">Комментарий</div>
                            <input onChange={e => this.props.set_disp_comment(e.target.value)} value={this.props.store.disp.comment} className="mobile_del_input" type="text"></input>
                        </div>
                    </div>

                    {/* <Foto /> */}
                    <MFoto />
                </div>
                )}
            </div>
        )
    } 
};


export default withCookies(connect(
    state => ({
        store: state
    }),
    dispatch => ({
        take_foto: (param) => { dispatch({ type: 'set_disp_foto', payload: param }) },
        reset_data: (param) => { dispatch({ type: 'reset_data', payload: param }); },
       
        set_QR: (param) => { dispatch({ type: 'set_QR', payload: param }); }, 
       
       
        set_active_loader: (param) => { dispatch({ type: 'set_active_loader', payload: param }); },
        set_disp_comment: (param) => { dispatch({ type: 'set_disp_comment', payload: param }); },
     
        set_disp_cash: (param) => { dispatch({ type: 'set_disp_cash', payload: param }); },
        set_disp_FIO: (param) => { dispatch({ type: 'set_disp_FIO', payload: param }); },
        set_disp_date: (param) => { dispatch({ type: 'set_disp_date', payload: param }); },
        set_disp_time: (param) => { dispatch({ type: 'set_disp_time', payload: param }); },
        set_disp_type_cash: (param) => { dispatch({ type: 'set_disp_type_cash', payload: param }); }, 
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }); },
        set_popup: (param) => { dispatch({ type: 'set_popup', payload: param }); }, 
        set_popup_message: (param) => { dispatch({ type: 'set_popup_message', payload: param }); },
    })

)(Screen));