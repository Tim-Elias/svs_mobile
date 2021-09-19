import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import { connect } from 'react-redux';

class Screen extends Component {
    
    handleScan = data => {
        if (data) {
            this.props.set_search_reciept(data);
            this.props.set_search_storagre(data);
            this.props.set_scann_active(false);
        }
    }
    
    handleError = err => {
        console.error(err)
    }

    render() {
        
        return (
            <div className="scanner_container">
                <QrReader
                    delay={100}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%', margin: " 0 0 10px 0" }}
                />
                <a className="scanner_close" onClick={e => this.props.set_scann_active(false)}></a>
            </div>
        )
    }
}


export default connect(
    (state) => ({ store: state }),
    dispatch => ({
        set_scann_active: (param) => { dispatch({ type: 'set_scann_active', payload: param }) },
        set_search_storagre: (param) => { dispatch({ type: 'set_search_storagre', payload: param }) },
        set_search_reciept: (param) => { dispatch({ type: 'set_search_reciept', payload: param }) },
    })
)(Screen);