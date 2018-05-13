import React, { Component } from 'react';

class DevicesList extends Component {

    onUpdateStatus(deviceId, status) {
        this.props.updateDeviceStatus(deviceId, status);
    }

    onDelete (index) {
        this.props.delDevice(index);
    }

    renderDevice(index) {
        const device = this.props.devices[index];
        let offBtnClassName, onBtnClassName;
        if(device.isOn){
            onBtnClassName = 'btn btn-outline-primary';
            offBtnClassName = 'btn btn-outline-secondary';
        }else{
            onBtnClassName = 'btn btn-outline-secondary';
            offBtnClassName = 'btn btn-outline-primary';
        }

        return (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{device.name}</td>
                <td>{device.ip}</td>
                <td>{device.group ? device.group : 'None'}</td>
                <td>
                    <div className="btn-toolbar float-right" role="toolbar">
                        <div className="btn-group mr-2" role="group">
                            <button
                              onClick={this.onUpdateStatus.bind(this, device.id, true)}
                              type="button" className={onBtnClassName}>
                                On
                            </button>
                            <button
                              onClick={this.onUpdateStatus.bind(this, device.id, false)}
                              type="button" className={offBtnClassName}>
                                Off
                            </button>
                        </div>
                        <div className="btn-group" role="group">
                            <button
                              type="button"
                              className="btn btn-outline-warning"
                              onClick={this.onDelete.bind(this, device.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }

    render() {
        const deviceList = this.props.devices.map((device, index) => this.renderDevice(index));

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Device Name</th>
                        <th scope="col">Device Address</th>
                        <th scope="col">Group</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { deviceList }
                </tbody>
            </table>
        );
    }
}

export default DevicesList;