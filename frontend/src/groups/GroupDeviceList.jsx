import React, { Component } from 'react';
import './style.css';

class GroupsDeviceList extends Component {

  removeDeviceFromGroup(groupId, deviceId) {
    this.props.removeDeviceFromGroup(groupId, deviceId);
  }

  renderDevice(index) {
    const device = this.props.devices[index];

    return (
      <li className={`list-group-item ${device.isOn ? 'list-group-item-success' : 'list-group-item-secondary'}`}
          key={index}>
        <span >{device.name}</span>
        <button
          className={'btn btn-danger btn-sm delete-button'}
          onClick={this.removeDeviceFromGroup.bind(this, this.props.groupId, device.id)}>
          &#10005;
        </button>
      </li>
    );
  }

  render() {
    const devicesList = this.props.devices.map((device, index) => this.renderDevice(index));

    return (
      <ul className={'list-group'}>
        { devicesList }
      </ul>
    );
  }
}

export default GroupsDeviceList;