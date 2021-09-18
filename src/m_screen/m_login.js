import React from 'react';
import { connect } from 'react-redux';
import './mobile_login.css';
import './mobile.css';
import { get_data } from '../common/common_modules';
// import md5 from 'md5';
import { withCookies } from 'react-cookie';

import { Header, Modal } from 'semantic-ui-react';

class Screen extends React.Component {

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.login();
        }
    }

    close_modal_portal = () => {
        this.props.set_modal_show(false)
    }

    login = () => {

        if (this.props.store.login.username !== '' || this.props.store.login.pass !== '') {
            const authdata = {
                username: this.props.store.login.username,
                // pass: md5(this.props.store.login.pass)
                pass: this.props.store.login.pass
            };

            get_data('authorization', authdata).then(
                (result) => {

                    this.props.login(result);

                    //this.get_list(result.userkey); //

                    this.props.cookies.set('username', this.props.store.login.username, { maxAge: 1000000000000 })
                    this.props.cookies.set('userkey', result.userkey, { maxAge: 1000000000000 })
                    // this.props.cookies.set('passkey', md5(this.props.store.login.pass), { maxAge: 1000000000000 })
                    this.props.cookies.set('passkey', this.props.store.login.pass, { maxAge: 1000000000000 })

                },
                (err) => {
                    this.props.set_modal_show(true)
                    this.props.set_modal_text(err)
                    this.props.set_modal_header('Ошибка')

                    console.log(err)
                }
            );
        }
        else {
            this.props.set_error('Необходимо ввести Имя пользователя и Пароль.')
        }
    };


    render() {

        return (
            <div className="mobile_container">

                <Modal closeIcon
                    open={this.props.store.general.modal_show}
                    onClose={this.close_modal_portal.bind(this)}
                >
                    <Header>{this.props.store.general.modal_header}</Header>
                    <Modal.Content>
                        <p>{this.props.store.general.modal_text}</p>
                    </Modal.Content>
                </Modal>


                <div className="mobile_login_container">
                    <div className="header_mobile_logo login_logo" >СВС-Логистик</div>
                    <input className="mobile_login_item" onKeyDown={this.handleKeyDown} onChange={e => this.props.set_login(e.target.value)} value={this.props.store.login.username} type="text" placeholder="Логин" name="username" />
                    <input className="mobile_login_item" onKeyDown={this.handleKeyDown} onChange={e => this.props.set_password(e.target.value)} value={this.props.store.login.pass} type="password" placeholder="Пароль" name="psw" />
                    <button onClick={this.login.bind(this)} className="mobile_logout mobile_login_item">
                        Вход
                    </button>

                </div>
            </div>
        )
    }
};


export default withCookies(connect(
    (state, ownProps) => ({ store: state, cookies: ownProps.cookies }),
    dispatch => ({
        login: (param) => { dispatch({ type: 'LOGIN', payload: param }) },
        set_login: (param) => { dispatch({ type: 'SET_USERNAME', payload: param }); },
        set_password: (param) => { dispatch({ type: 'SET_PASS', payload: param }); },
        set_error: (param) => { dispatch({ type: 'SET_ERROR', payload: param }) },
        set_modal_show: (param) => { dispatch({ type: 'set_modal_show', payload: param }) },
        set_modal_text: (param) => { dispatch({ type: 'set_modal_text', payload: param }) },
        set_modal_header: (param) => { dispatch({ type: 'set_modal_header', payload: param }) },
    })
)(Screen));