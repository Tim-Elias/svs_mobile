import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import './mobile_storage.css';
import { get_data } from '../common/common_modules';
import update from '../common/update.png';
import scanner from '../common/scanner.png';
import { withCookies } from 'react-cookie';
import Wait from "./wait";
import Scanner from "./scanner";
// const socket = new WebSocket('wss://echo.websocket.org');

class Screen extends React.Component {

    settings_window = (window) => {
        this.props.set_active_window(window);
    }

    tr_click = async (disp) => {

        const data = {
            userkey: this.props.store.login.userkey,
            status: "",
            num: disp.Number,
        };

        this.props.set_key(data);
        this.props.set_active_window("m_disp");

    };

    update = () => {
        this.props.set_active_window("wait");
        const list_data = { userkey: this.props.store.login.userkey };

        get_data('list', list_data).then(
            (result) => {
                this.props.set_list_storage(result);
                this.props.set_active_window("m_storage");
                this.props.set_search_storagre("");
            },
            (err) => { console.log(err) }
        );
    }

    disp_type = (disp) => {
        let disp_bg = "";
        if (disp.Status === 'Отменена') {
            disp_bg = "mobile_storage_item mobile_storage_item--canceling";
        } else if (disp.Type === 'Заявка') {
            disp_bg = 'mobile_storage_item mobile_storage_item--applications';
        } else {
            disp_bg = "mobile_storage_item";
        }
        return disp_bg;
    }

    showNotification = () => {
        const notification = new Notification("New message!", {
            body: "Test message",
            requireInteraction: true,
            icon: "../wait.svg",
        });

        notification.onclick = (e) => {
            this.settings_window("m_disp")
        }
    }

    componentDidMount() {
        // socket.onopen = () => {
        //     console.log('WebSocket Client Connected');
        //     console.log(socket)
        // };
        // socket.onmessage = (message) => {
        //     console.log(message);
        // };

        if (this.props.cookies.get('num')) {
            this.props.cookies.remove('num');
        }
        if (this.props.cookies.get('status')) {
            this.props.cookies.remove('status');
        }
        if (this.props.cookies.get('window')) {
            this.props.cookies.remove('window');
        }

        // if ('serviceWorker' in navigator) {
        //     navigator.serviceWorker.register('/sw.js').then(function (registration) {
        //         console.log('ServiceWorker registration successful');
        //     }, function (err) {
        //         console.log('ServiceWorker registration failed: ', err);
        //     });
        // }

        // if (Notification.permission === "granted") {
        //     this.showNotification();
        // } else if (Notification.permission === "denied" || "default") {
        //     Notification.requestPermission().then(permission => {
        //         if(permission === "granted") {
        //             this.showNotification();
        //         }
        //     })
        // }

        this.props.set_active_loader(true);

        const list_data = { userkey: this.props.store.login.userkey };

        get_data('list', list_data).then(
            (result) => {
                this.props.set_list_storage(result);
                this.props.set_active_loader(false);
                this.props.set_search_storagre("");
            },
            (err) => { console.log(err) }
        );
    }

    componentWillUnmount() {
        this.props.set_scann_active(false);
        this.props.set_search_reciept("");
        this.props.set_last_window("m_storage");
    }

    render() {

        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            this.settings_window('Mmenu')
            window.history.pushState(null, "", window.location.href);
        }.bind(this);

        return (
            <div>
                <div className="mobile_heading">
                    Накладные
                </div>
                {this.props.store.general.active_loader ? (<Wait />) : (
                <div className="mobile_storage">
                    <div className="mobile_container">
                        <div className="mobile_search">
                            <div className="mobile_search_label">
                                Поиск:
                            </div>
                            <input className="mobile_search_input" value={this.props.store.storage.search} onChange={(e) => { this.props.set_search_storagre(e.target.value) }} />
                            <img src={update} className="update" onClick={this.update.bind(this)} />
                            <img src={scanner} className="update" onClick={e => this.props.set_scann_active(!this.props.store.storage.scann_active)} />
                        </div>

                        {this.props.store.storage.scann_active ? (
                            <Scanner />
                        ) : (null)}

                        {this.props.store.storage.list.filter((el) => {
                            const filter_num = el.Number.toUpperCase()
                            const filter_adress = el.Adress.toUpperCase()
                            const text = this.props.store.storage.search.toUpperCase()
                            return text === "" || filter_num.indexOf(text) > -1 || filter_adress.indexOf(text) > -1
                        }).map((disp, index) =>
                            
                            <div key={index} onClick={this.tr_click.bind(this, disp)} 
                            className={(disp.Status === 'Отмена') ? "mobile_storage_item mobile_storage_item--canceling" : 
                                (disp.Type === 'Заявка') ? ((disp.Status === 'Новая') ? ('mobile_storage_item mobile_storage_item--new') : ('mobile_storage_item mobile_storage_item--applications')) :
                                    ("mobile_storage_item")}>
                                <div className="mobile_storage_data">
                                    <div className="mobile_storage_field">{disp.Customer}</div>
                                    <div className="mobile_storage_field">{disp.Date}</div>
                                    <div className="mobile_storage_field">{disp.Number}</div>
                                    <div className="mobile_storage_field">{disp.City} {disp.Adress}</div>
                                    <div className="mobile_storage_field">{disp.Phone} {disp.Person}</div>
                                    <div className="mobile_storage_field">{disp.AddInfo}</div>
                                </div>
                                <div className="mobile_storage_item_row">
                                    <div className="mobile_storage_field">{disp.Time}</div>
                                    
                                    
                                </div>
                            </div>

                        )}
                    </div>
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
        set_scann_active: (param) => { dispatch({ type: 'set_scann_active', payload: param }) },
        set_key: (param) => { dispatch({ type: 'set_key', payload: param }) },
        set_data_disp: (param) => { dispatch({ type: 'set_data_disp', payload: param }) },
        set_last_window: (param) => { dispatch({ type: 'set_last_window', payload: param }) },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
        set_action: (param) => { dispatch({ type: 'set_action', payload: param }) }, 
        set_search_storagre: (param) => { dispatch({ type: 'set_search_storagre', payload: param }) }, 
        set_list_storage: (param) => { dispatch({ type: 'set_list_storage', payload: param }) },
        set_active_loader: (param) => { dispatch({ type: 'set_active_loader', payload: param }) },
        set_search_reciept: (param) => { dispatch({ type: 'set_search_reciept', payload: param }) },
    })
)(Screen));