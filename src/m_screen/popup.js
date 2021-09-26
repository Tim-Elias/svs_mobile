import React from 'react';
import { connect } from 'react-redux';

class Screen extends React.Component {

    render() {

        return (
            <div>
                <div className={this.props.store.disp.popup_message ? ("PopUp_container") : ("none")} onClick={() => this.props.set_popup_message(false)}></div>
                <div className={this.props.store.disp.popup_message ? ("PopUp_window") : ("none")}>
                    <p>{this.props.store.disp.popup_message}</p>
                    <button className="PopUp_button_check" onClick={() => this.props.set_popup_message(false)}>Ок</button>
                </div>
            </div>
        )
    }
};


export default connect(
    (state) => ({ store: state }),
    dispatch => ({
        set_popup_message: (param) => { dispatch({ type: 'set_popup_message', payload: param }); },
    })
)(Screen);
