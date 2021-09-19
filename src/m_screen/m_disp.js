import React from 'react';
import { connect } from 'react-redux';
import './mobile.css';
import { get_data } from '../common/common_modules';
import './mobile_disp.css';
import Wait from "./wait";
import { withCookies } from 'react-cookie';

class Screen extends React.Component {

    settings_window = (window) => {
        this.props.set_active_window(window);
    }

    loadData = (num = this.props.store.disp.key.num, status = this.props.store.disp.key.status) => {
        this.props.cookies.set('window', 'm_disp', { maxAge: 1000000000000 })
        this.props.cookies.set('num', num, { maxAge: 1000000000000 })
        this.props.cookies.set('status', status, { maxAge: 1000000000000 })

        this.props.set_active_loader(true);
        
        const data = {
            userkey: this.props.store.login.userkey,
            status: status,
            num: num,
        };

        get_data('dispatch', data).then(
            (result) => {
                this.props.set_data_disp(result);
                this.props.set_action("deliver");
                this.props.set_active_loader(false);
            },
            (err) => {
                console.log(err)
                // alert(err)
                this.settings_window("m_storage");
            }
        );
    } 

    componentDidMount() {
        this.loadData();
    }

    componentWillUnmount() {
        this.props.set_last_window("m_disp");
    }

    // setorderstatus = (stat) => {
    //     const data = {
    //         userkey: this.props.store.login.userkey,
    //         num: this.props.store.disp.data.Number,
    //         status: stat,
    //     }

    //     get_data('setorderstatus', data).then (
    //         (result) => {
    //             this.loadData();
    //             if(stat === "Выполнено") {
    //                 this.settings_window("m_storage");
    //             }
    //         },
    //         (err) => {
    //             console.log(err)
    //             alert(err)
    //         }
    //     );
    // }

    // search_reciept = () => {
    //     const data = {
    //         userkey: this.props.store.login.userkey,
    //         status: "Ожидается",
    //         num: this.props.store.disp.data.OrdersDisp[0],
    //     };
    //     this.props.set_key(data);

    //     this.loadData(this.props.store.disp.data.OrdersDisp[0], "Ожидается");
    // }

    // create_disp = () => {

    //     this.props.set_active_window("wait");

    //     get_data('citylist').then(
    //         (result) => {
    //             this.props.SetCityList(result);

    //             // const send_city = this.props.store.m_create_disp.CityList.filter((el) => el.value == this.props.store.disp.data.SendCity);
    //             // const rec_city = this.props.store.m_create_disp.CityList.filter((el) => el.value == this.props.store.disp.data.RecCity);

    //             const send_city = result.filter((el) => el.value == this.props.store.disp.data.SendCity)[0];
    //             const rec_city = result.filter((el) => el.value == this.props.store.disp.data.RecCity)[0];

    //             const s_city = {
    //                 city: this.props.store.disp.data.SendCity,
    //             };
    //             const r_city = {
    //                 city: this.props.store.disp.data.RecCity,
    //             };

    //             get_data('terminallist', s_city).then(
    //                 (result) => {
    //                     const data = {
    //                         result: result,
    //                         terminal: null,
    //                     }
    //                     this.props.SetSendTerminalList(data);
    //                 },
    //                 (err) => {
    //                     console.log("err");
    //                     console.log(err);
    //                 }
    //             );

    //             get_data('terminallist', r_city).then(
    //                 (result) => {
    //                     const data = {
    //                         result: result,
    //                         terminal: null,
    //                     }
    //                     this.props.SetRecTerminalList(data);
    //                 },
    //                 (err) => {
    //                     console.log("err");
    //                     console.log(err);
    //                 }
    //             );
    //             let data = {
    //                 data: {
    //                     del_method: this.props.store.disp.data.DelMethod,
    //                     pay_type: this.props.store.disp.data.PayType,
    //                     send_address: this.props.store.disp.data.SendAdress,
    //                     send_company: this.props.store.disp.data.SendCompany,
    //                     send_phone: this.props.store.disp.data.SendPhone,
    //                     send_person: this.props.store.disp.data.SendPerson,
    //                     send_addinfo: this.props.store.disp.data.SendAddInfo,
    //                     rec_address: this.props.store.disp.data.RecAdress,
    //                     rec_company: this.props.store.disp.data.RecCompany,
    //                     rec_phone: this.props.store.disp.data.RecPhone,
    //                     rec_person: this.props.store.disp.data.RecPerson,
    //                     rec_addinfo: this.props.store.disp.data.RecAddInfo,
    //                 },
    //                 send_city: send_city,
    //                 rec_city: rec_city,
    //             }
    //             this.props.set_select_template(data);
    //             this.props.set_Customer(this.props.store.disp.data.Customer);
    //             this.props.set_active_window("m_create_disp");
    //         },
    //         (err) => {
    //             console.log(err)
    //         }
    //     );

    // }

    render() {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            this.settings_window(this.props.store.general.last_window[this.props.store.general.last_window.length-1]);
            window.history.pushState(null, "", window.location.href);
        }.bind(this);

        let SendPhoneList = this.props.store.disp.data.SendPhone.split(',');// для нескольких телефонов
        let RecPhoneList = this.props.store.disp.data.RecPhone.split(',');// для нескольких телефонов
        
        return (
            <div>
                <div className="mobile_heading">
                    {this.props.store.disp.data.Type} №{this.props.store.disp.data.Number}
                </div>

                {this.props.store.general.active_loader ? (<Wait />) : (
                <div>

                    

                    {/* {this.props.store.disp.key.status === "Ожидается" ? (
                        <div className="mobile_disp_button">
                            <button className="mobile_disp_button_item mobile_disp_button_item--full" onClick={this.settings_window.bind(this, "m_receiv_from_sender")}>Получить от отправителя</button>
                        </div>
                    ) : (
                        <div>
                            {this.props.store.disp.data.Type === 'Заявка' && this.props.store.disp.data.Status === 'Подтверждено' ?
                            (<div className="mobile_disp_button">
                                <button className="mobile_disp_button_item mobile_disp_button_item--full" onClick={this.setorderstatus.bind(this, "Выполнено")}>Выполнено</button>
                            </div>)
                            : (null)}

                            {this.props.store.disp.data.Type === 'Заявка' && this.props.store.disp.data.Status === 'Новая' ?
                                (<div className="mobile_disp_button">
                                    <button className="mobile_disp_button_item mobile_disp_button_item--full" onClick={this.setorderstatus.bind(this, "Подтверждено")}>Подтвердить</button>
                                     <div className="mobile_disp_button">
                                        <button className={+this.props.store.disp.cash_accepted > 0 && this.props.store.login.kkm && this.props.store.disp.data.CheckEnabled && this.props.store.disp.data.ChangeSumm == false ? ("mobile_disp_button_item mobile_disp_button_item--blue") : ("none")} onClick={this.receipt.bind(this)}>
                                            Чек
                                        </button>

                                        <div className="mobile_del_row">
                                            <div className="mobile_del_data_label">Принятая сумма</div>
                                            <input className="mobile_del_input" value={this.props.store.disp.cash_accepted} onChange={e => this.props.set_disp_cash(e.target.value)} type="number"></input>
                                        </div>
                                    </div> 
                                </div>)
                            : (null)}

                            {this.props.store.disp.data.Type === 'Доставка' ? (*/}
                                
                                    <div className="mobile_disp_button">
                                    <button className="mobile_disp_button_item" onClick={this.settings_window.bind(this, 'm_delivered')}>Доставлено</button>
                                    <button className="mobile_disp_button_item--not mobile_disp_button_item" onClick={this.settings_window.bind(this, 'm_not_delivered')}>Не доставлено</button>
                                </div>
                                {/* )
                             : (null)}
                         </div>
                     )} */}

                    <div className="disp_customer_data">
                        <div className="mobile_disp_data_label">Заказчик:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.Customer}</div>
                        {this.props.store.disp.data.Type === 'Доставка' ? (null) : (
                            <div className="mobile_disp_data_label">Срочность:</div>
                        )}
                        {this.props.store.disp.data.Type === 'Доставка' ? (null) : (
                            <div className="mobile_disp_data_el">{this.props.store.disp.data.DelType}</div>
                        )}
                        {this.props.store.disp.data.Type === 'Доставка' ? (null) : (
                            <div className="mobile_disp_data_label">Тип оплаты:</div>
                        )}
                        {this.props.store.disp.data.Type === 'Доставка' ? (null) : (
                            <div className="mobile_disp_data_el">{this.props.store.disp.data.PayType}</div>
                        )}
                        <div className="mobile_disp_data_label">К оплате:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.COD}</div>
                    </div>

                    <div className="mobile_disp_address_data">
                        <div className="disp_address_data_header">Данные получателя</div>

                        <div className="disp_address_data_el">
                            <div className="mobile_disp_data_label"> Город:</div>
                            <div className="mobile_disp_data_el">{this.props.store.disp.data.RecCity}</div>
                            <div className="mobile_disp_data_label"> Адрес:</div>
                            <div className="mobile_disp_data_el">{this.props.store.disp.data.RecAdress}</div>
                            <div className="mobile_disp_data_label"> Компания:</div>
                            <div className="mobile_disp_data_el">{this.props.store.disp.data.RecCompany}</div>
                            <div className="mobile_disp_data_label"> Телефон:</div>
                            <div className="mobile_disp_data_el">
                                {RecPhoneList.map((item, index) =>
                                    <div key={index}><a href={"tel:" + ((item[0] == 7) ? ("+" + item) : (item[0] == "(") ? ("+7" + item) : (item[0] == 9) ? ("+7" + item) : (item))}>{(item[0] == 7) ? ("+" + item) : (item[0] == "(") ? ("+7" + item) : (item[0] == "9") ? ("+7" + item) : (item)}</a>{index != RecPhoneList.length - 1 ? (', ') : (null)}</div>
                                )}
                            </div>
                            <div className="mobile_disp_data_label"> Контактное лицо:</div>
                            <div className="mobile_disp_data_el">{this.props.store.disp.data.RecPerson}</div>
                            <div className="mobile_disp_data_label"> Доп. информация:</div>
                            <div className="mobile_disp_data_el">{this.props.store.disp.data.RecAddInfo}</div>
                            <div className="mobile_disp_data_label"> Время:</div>
                            <div className="mobile_disp_data_el">{this.props.store.disp.data.Time}</div>
                        </div>
                    </div>

                    <div className="mobile_disp_address_data">
                        <div className="disp_address_data_header">Данные отправителя</div>

                        <div className="disp_address_data_el">
                            <div className="mobile_disp_data_label"> Город:</div>
                            <div className="mobile_disp_data_el">{this.props.store.disp.data.SendCity}</div>
                            <div className="mobile_disp_data_label"> Адрес:</div>
                            <div className="mobile_disp_data_el">{this.props.store.disp.data.SendAdress}</div>
                            <div className="mobile_disp_data_label"> Компания:</div>
                            <div className="mobile_disp_data_el">{this.props.store.disp.data.SendCompany}</div>
                            <div className="mobile_disp_data_label"> Телефон:</div>
                            <div className="mobile_disp_data_el">
                                {SendPhoneList.map((item, index) => 
                                    <div key={index}><a href={"tel:" + item}>{item}</a>{index != SendPhoneList.length - 1 ? (', ') : (null)}</div>
                                )}
                            </div>
                            <div className="mobile_disp_data_label"> Контактное лицо:</div>
                            <div className="mobile_disp_data_el">{this.props.store.disp.data.SendPerson}</div>
                            <div className="mobile_disp_data_label"> Доп. информация:</div>
                            <div className="mobile_disp_data_el">{this.props.store.disp.data.SendAddInfo}</div>
                        </div>
                    </div>

                    <div className="mobile_disp_cargo_table">
                        <div className="disp_address_data_header">Отправление:</div>
                        <div className="mobile_disp_cargo_table_data">
                                
                                <div className="disp_address_data_el">
                                    
                                    <div className="mobile_disp_data_label">Вес</div>
                                    <div className="mobile_disp_data_el">{this.props.store.disp.data.Weight}</div>
                                    {/* <div className="mobile_disp_data_label">Вид доставки:</div>
                                    <div className="mobile_disp_data_el">{this.props.store.disp.data.DelMethod}</div> */}
                                    {/* <div className="mobile_disp_data_label">Рассчетная дата:</div>
                                    <div className="mobile_disp_data_el">{this.props.store.disp.data.PlaneDate}</div> */}

                                    <div className="mobile_disp_data_label">Мест:</div>
                                    <div className="mobile_disp_data_el">{this.props.store.disp.data.Total}</div>
                                    {/* <div className="mobile_disp_data_label">Сумма наложенного платежа:</div>
                                    <div className="mobile_disp_data_el">{this.props.store.disp.data.COD}</div> */}
                                    {/* {this.props.store.disp.data.TMin !== "0" && this.props.store.disp.data.TMax !== "0" ? <div>
                                        <div className="mobile_disp_data_label">Температурный режим:</div>
                                        <div className="mobile_disp_data_el">{this.props.store.disp.data.TMin} : {this.props.store.disp.data.TMax}</div>
                                    </div>:(null)} */}
                                    <div className="mobile_disp_data_label">Тип оплаты:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.PayType}</div>
                        <div className="mobile_disp_data_label">Тип доставки:</div>
                        <div className="mobile_disp_data_el">{this.props.store.disp.data.DelType}</div> 
                                </div>
                        </div>            
                    </div>

                   
                    
                    {/* {this.props.store.disp.cargo.length != 0 ? (
                        <div className="mobile_disp_address_data">
                            <div className="disp_address_data_header disp_address_data_header--green">Грузы</div>
                            <div className="disp_address_data_el mobile_disp_address_data_el">
                                {this.props.store.disp.cargo.map((cargo, index) =>

                                    <div key={index} className="cargo_item">
                                        <div className="">{cargo.Weight}кг, (Об. {cargo.Volume}кг), ({cargo.L}X{cargo.W}X{cargo.H}) {cargo.Q}шт.<br /> Итого {cargo.TotalWeight}кг,(Об. {cargo.TotalVolume}кг)</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (null)} */}

                <br />
                </div>)}
                
            </div>
        )
    }
};


export default withCookies(connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_Customer: (param) => { dispatch({ type: 'set_Customer', payload: param }) },
        set_select_template: (param) => { dispatch({ type: 'set_select_template', payload: param }); },
        SetSendTerminalList: (param) => { dispatch({ type: 'SetSendTerminalListMobile', payload: param }) },
        SetRecTerminalList: (param) => { dispatch({ type: 'SetRecTerminalListMobile', payload: param }) },
        SetCityList: (param) => { dispatch({ type: 'SetCityListMobile', payload: param }) },
        set_key: (param) => { dispatch({ type: 'set_key', payload: param }) },
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }); },
        set_data_disp: (param) => { dispatch({ type: 'set_data_disp', payload: param }) },
        set_last_window: (param) => { dispatch({ type: 'set_last_window', payload: param }) },
        set_action: (param) => { dispatch({ type: 'set_action', payload: param }) }, 
        set_active_loader: (param) => { dispatch({ type: 'set_active_loader', payload: param }); },
        set_popup_message: (param) => { dispatch({ type: 'set_popup_message', payload: param }); },
    })

)(Screen));