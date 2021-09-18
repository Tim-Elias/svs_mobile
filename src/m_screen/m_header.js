import React from 'react';
import { connect } from 'react-redux';

import './mobile_header.css';
import menu from '../common/burger_menu.png';
import { withCookies } from 'react-cookie';
import arrow from '../common/blue-arrow.png';

class Screen extends React.Component {

    menu_active = () => {
        this.props.set_mobile_menu('Mmenu');
    }
    
    menu_active_arrow = (window) => {
        this.props.set_mobile_menu(window);
    }


    render() {

        return (
            <header className="header_mobile">
                <div className="mobile_container">
                    <img className={(this.props.store.general.active_window === 'm_delivered' 
                    || this.props.store.general.active_window === 'm_not_delivered') ? "blue_arrow" : "none"} src={arrow} onClick={this.menu_active_arrow.bind(this, 'm_disp')} alt="" />
                    <img className={(this.props.store.general.active_window === 'm_disp') ? "blue_arrow" : "none"} src={arrow} onClick={this.menu_active_arrow.bind(this, 'm_storage')} alt="" />
                    <img className={(this.props.store.general.active_window === 'Mmenu' 
                    || this.props.store.general.active_window === 'm_disp' 
                    || this.props.store.general.active_window === 'm_delivered' 
                    || this.props.store.general.active_window === 'm_not_delivered' 
                    || this.props.store.general.active_window === 'm_movement' 
                    || this.props.store.general.active_window === 'm_bounty' 
                    || this.props.store.general.active_window === 'm_manifest'
                    || this.props.store.general.active_window === 'm_receiv_from_sender'
                    || this.props.store.general.active_window === 'm_check_print') ? "none" : "burger_menu"} src={ menu } onClick={ this.menu_active.bind(this) } alt="" />
                    <img className={(this.props.store.general.active_window === 'm_movement') ? "blue_arrow" : "none"} src={arrow} onClick={this.menu_active_arrow.bind(this, 'm_finance')} alt="" />
                    <img className={(this.props.store.general.active_window === 'm_check_print') ? "blue_arrow" : "none"} src={arrow} onClick={this.menu_active_arrow.bind(this, 'm_bounty')} alt="" />
                    
                    <img className={(this.props.store.general.active_window === 'm_bounty') ? "blue_arrow" : "none"} src={arrow} onClick={this.menu_active_arrow.bind(this, 'm_finance')} alt="" />
                    <img className={(this.props.store.general.active_window === 'm_manifest') ? "blue_arrow" : "none"} src={arrow} onClick={this.menu_active_arrow.bind(this, 'm_get_manifest')} alt="" />

                    <img className={(this.props.store.general.active_window === 'm_receiv_from_sender') ? "blue_arrow" : "none"} src={arrow} onClick={this.menu_active_arrow.bind(this, 'm_disp')} alt="" />
                    <div className="header_mobile_logo">СВС-Логистик</div>
                </div>
            </header>
        )
    }
};


export default withCookies(connect(
    (state, ownProps) => ({ store: state, cookies: ownProps.cookies }),
    dispatch => ({
        set_mobile_menu: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
    })
)(Screen));