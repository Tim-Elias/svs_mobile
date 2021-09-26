import React from 'react';
import { connect } from 'react-redux';
import MHeader from './m_header';
import MMenu from './m_menu';
// import './mobile.css';
import MStorage from './m_storage';
import Wait from '../m_screen/wait';
import MSetting from './m_setting';
import MDisp from './m_disp';
import MDelivered from './m_delivered';
import MNotDelivered from './m_not_delivered';
// import MStorageReciept from './m_storage_reciept';
import MReciept from './m_reciept';
// import MSend from './m_send_manifest';
// import MGet from './m_get_manifest';
// import MManifest from './m_manifest';
// import MFinance from './m_finance';
// import MMovement from './m_movement';
// import MBounty from './m_bounty';
// import MScanner from './scanner'; 
// import MPosition from './position'; 
// import MCheckPrint from './m_check_print';
// import MCalcPrice from './m_calc_price';
// import MCreateDisp from './m_create_disp';
// import MDispTemplate from './m_disp_template';
// import MReceiveFromSender from './m_receive_from_sender';
// import MSendPartner from './m_send_partner';
import PopUp from './popup';
import { withCookies } from 'react-cookie';

class Screen extends React.Component {

    componentDidMount() {
        if (this.props.store.general.active_window === "home") {
            
            const wind = this.props.cookies.get('window')
            if (wind == undefined){
                this.props.set_active_window("m_storage")
            }else{
                this.props.set_active_window(wind)
                if(wind === 'm_disp') {

                    const data = {
                        userkey: this.props.store.login.userkey,
                        status: this.props.cookies.get('status'),
                        num: this.props.cookies.get('num'),
                    };

                    this.props.set_key(data);
                }
            }
        }
    }


    render() {

        return (

            <div>
                <MHeader />
                {this.props.store.general.active_window === 'm_storage' ? (<MStorage />) : (null)}
                {this.props.store.general.active_window === 'Mmenu' ? (<MMenu />) : (null)}
                {this.props.store.general.active_window === 'm_disp' ? (<MDisp />) : (null)}
                {/* {this.props.store.general.active_window === 'm_disp_template' ? (<MDispTemplate />) : (null)}*/}
                {this.props.store.general.active_window === 'm_delivered' ? (<MDelivered />) : (null)}
                {this.props.store.general.active_window === 'm_not_delivered' ? (<MNotDelivered />) : (null)}
                {/*{this.props.store.general.active_window === 'storage_reciept' ? (<MStorageReciept />) : (null)}*/}
                {this.props.store.general.active_window === 'm_reciept' ? (<MReciept />) : (null)}
                {/* {this.props.store.general.active_window === 'm_send_partner' ? (<MSendPartner />) : (null)}
                {this.props.store.general.active_window === 'm_send_manifest' ? (<MSend />) : (null)}
                {this.props.store.general.active_window === 'm_get_manifest' ? (<MGet />) : (null)}
                {this.props.store.general.active_window === 'm_manifest' ? (<MManifest />) : (null)}
                {this.props.store.general.active_window === 'm_finance' ? (<MFinance />) : (null)}
                {this.props.store.general.active_window === 'm_movement' ? (<MMovement />) : (null)}
                {this.props.store.general.active_window === 'm_bounty' ? (<MBounty />) : (null)} */}
                {this.props.store.general.active_window === 'setting' ? (<MSetting />) : (null)}
                {/* {this.props.store.general.active_window === 'm_calc_price' ? (<MCalcPrice />) : (null)} */}
                {this.props.store.general.active_window === 'wait' ? (<Wait />) : (null)}
                {/* {this.props.store.general.active_window === 'm_check_print' ? (<MCheckPrint />) : (null)}
                {this.props.store.general.active_window === 'scanner' ? (<MScanner />) : (null)}
                {this.props.store.general.active_window === 'm_create_disp' ? (<MCreateDisp />) : (null)}*/}
                {/* {this.props.store.general.active_window === 'm_receiv_from_sender' ? (<MReceiveFromSender />) : (null)} */}
                <PopUp />
                {/*{this.props.store.general.active_window === 'position' ? (<MPosition />) : (null)} */}
            </div>
        )
    }
};


export default withCookies(connect(
    state => ({
        store: state
    }),
    dispatch => ({
        set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }); },
        set_key: (param) => { dispatch({ type: 'set_key', payload: param }) },
        login: (param) => { dispatch({ type: 'LOGIN', payload: param }) },
    })
)(Screen));