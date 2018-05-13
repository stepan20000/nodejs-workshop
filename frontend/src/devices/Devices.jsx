import React, { Component } from 'react';
import DeviceForm from './DeviceForm';
import '../App.css';
import DevicesList from './DevicesList';

class Devices extends Component {

  updateDeviceStatus(id, isOn) {
    fetch(`/api/device/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isOn
      })
    })
      .then(res => res.json())
      .then((res) => {
        this.props.updateDevices(res);
      })
      .catch(err => console.log(err));
  }

  addDevice(name, ip) {
    fetch('/api/device', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        ip
      }),
    })
      .then(res => res.json())
      .then((res) => {
        this.props.updateDevices(res);
      })
      .catch(err => console.log(err));
  }

  delDevice(id) {
    fetch( `api/device/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then((res) => {
        this.props.updateDevices(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <section className="container-fluid">
        <DevicesList
          devices={this.props.devices}
          updateDeviceStatus={this.updateDeviceStatus.bind(this)}
          delDevice={this.delDevice.bind(this)} />
        <DeviceForm addDevice={this.addDevice.bind(this)} />
      </section>
    );
  }
}

export default Devices;
