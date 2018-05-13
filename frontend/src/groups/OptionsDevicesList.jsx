import React, { Component } from 'react';

class OptionsDevicesList extends Component {
  constructor(props) {
    super(props);
    this.device = React.createRef();
  }

  onSelect() {
    const value = JSON.parse(this.device.current.value);
    this.props.addDeviceToGroup(value.groupId, value.deviceId);
  }

  renderDevice(device) {
    if (device) {
      return (
        <option
          key={device.id}
          value={JSON.stringify({deviceId: device.id, groupId: this.props.group.id})}>
          {device.name}
        </option>
      );
    }
    return null;
  }

  render() {
    const devises = this.props.devices.map(device => this.renderDevice(device));
    return (
      <select className={'form-control'} defaultValue={"none"} ref={this.device} onChange={this.onSelect.bind(this)}>
        <option selected={true} value="none"> -- add a device -- </option>
        {devises}
      </select>
    );
  }
}

export default OptionsDevicesList;