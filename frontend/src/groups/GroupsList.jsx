import React, { Component } from 'react';
import GroupsDeviceList from './GroupDeviceList';
import OptionsDevicesList from './OptionsDevicesList';
import './style.css';

class GroupsList extends Component {

  onUpdateStatus(groupId, status) {
    this.props.setGroupStatus(groupId, status);
  }

  onDelete (groupId) {
    this.props.delGroup(groupId);
  }

  addDeviceToGroup(groupId, deviceId) {
    this.props.addDeviceToGroup(groupId, deviceId);
  }

  removeDeviceFromGroup(groupId, deviceId) {
    this.props.removeDeviceFromGroup(groupId, deviceId);
  }

  filterDevises(allDevices, groupDeviceIds) {
    if (!groupDeviceIds.length) {
      return allDevices;
    }
    return allDevices.filter(allDevice => !groupDeviceIds.find(groupDeviceId => (
      groupDeviceId === allDevice.id)
    ));
  }

  findGroupDevices(allDevices, deviceIds) {
    return allDevices.filter(device => deviceIds.indexOf(device.id) > -1);
  }

  renderGroup(index) {
    const allDevices = this.props.devices;
    const group = this.props.groups[index];
    let offBtnClassName, onBtnClassName;
    if(group.isOn){
      onBtnClassName = 'btn btn-outline-primary';
      offBtnClassName = 'btn btn-outline-secondary';
    }else{
      onBtnClassName = 'btn btn-outline-secondary';
      offBtnClassName = 'btn btn-outline-primary';
    }

    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>
          <h3>{group.name}</h3>
          <GroupsDeviceList
            groupId={group.id}
            devices={this.findGroupDevices.bind(this, allDevices, group.devices)()}
            removeDeviceFromGroup={this.removeDeviceFromGroup.bind(this)}/>
        </td>
        <td className={'controls-col'}>
          <div className="btn-toolbar float-right" role="toolbar">
            <div className="btn-group mr-2" role="group">
              <button
                onClick={this.onUpdateStatus.bind(this, group.id, true)}
                type="button" className={onBtnClassName}>
                On
              </button>
              <button
                onClick={this.onUpdateStatus.bind(this, group.id, false)}
                type="button" className={offBtnClassName}>
                Off
              </button>
            </div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-outline-warning"
                onClick={this.onDelete.bind(this, group.id)}>
                Delete
              </button>
            </div>
          </div>
          <div className={'select-wrapper'}>
            <OptionsDevicesList
              group={group}
              devices={this.filterDevises(this.props.devices, group.devices)}
              addDeviceToGroup={this.addDeviceToGroup.bind(this)}
              removeDeviceFromGroup={this.removeDeviceFromGroup.bind(this)}/>
          </div>
        </td>
      </tr>
    );
  }

  render() {
    const groupsList = this.props.groups.map((group, index) => this.renderGroup(index));

    return (
      <table className="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Group Name</th>
        </tr>
        </thead>
        <tbody>
        { groupsList }
        </tbody>
      </table>
    );
  }
}

export default GroupsList;