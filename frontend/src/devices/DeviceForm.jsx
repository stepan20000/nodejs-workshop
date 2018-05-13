import React, { Component } from 'react';

class DeviceForm extends Component {
    
    constructor(){
        super();
        this.name = React.createRef();
        this.ip = React.createRef();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const name = this.name.current.value;
        const ip = this.ip.current.value;
        this.props.addDevice(name, ip);
    }

    render() {
        return (
            <form className="form-inline ml-5" onSubmit={this.onSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor={"deviceName"} className="sr-only">Device Name</label>
                    <input type="text" ref={this.name} className="form-control" id="deviceName" placeholder="Device Name" />
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor={"deviceAddress"} className="sr-only">IP Address</label>
                    <input type="text" ref={this.ip} className="form-control" id="deviceAddress" placeholder="IP Address" />
                </div>
                <button type="submit" className="btn btn-primary mb-2">Add Device</button>
            </form>
        );
    }
}

export default DeviceForm;
