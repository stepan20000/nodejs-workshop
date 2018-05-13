import React, { Component } from 'react';
import '../App.css';
import GroupsList from './GroupsList';
import GroupForm from './GroupForm';

class Groups extends Component {

  addDeviceToGroup(groupId, deviceId) {
    fetch(`/api/group/update/${groupId}/${deviceId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({groupId, deviceId})
    })
      .then(res => res.json())
      .then((res) => {
        this.props.updateGroups(res);
      })
      .catch(err => console.log(err));
  }

  removeDeviceFromGroup(groupId, deviceId) {
    fetch(`/api/group/update/${groupId}/${deviceId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({groupId, deviceId})
    })
      .then(res => res.json())
      .then((res) => {
        this.props.updateGroups(res);
      })
      .catch(err => console.log(err));
  }

  addGroup(name) {
    fetch('/api/group', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name
      }),
    })
      .then(res => res.json())
      .then((res) => {
        this.props.updateGroups(res);
      })
      .catch(err => console.log(err));
  }

  delGroup(id) {
    fetch( `api/group/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then((res) => {
        this.props.updateGroups(res);
      })
      .catch(err => console.log(err));
  }

  setGroupStatus(groupId, isOn) {
    fetch('api/group/on-off', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: groupId, isOn})
    })
      .then(res => {
        if (res.status === 304) {
          throw new Error('not modified');
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        this.props.updateGroupsAndDevices(res)
      })
      .catch(err => {
        if (err.message === 'not modified') {
          return;
        }
        console.log(err)
      });
  }

  render() {
    return (
      <section className="container-fluid">
        <GroupsList
          groups={this.props.groups}
          devices={this.props.devices}
          delGroup={this.delGroup.bind(this)}
          addDeviceToGroup={this.addDeviceToGroup.bind(this)}
          removeDeviceFromGroup={this.removeDeviceFromGroup.bind(this)}
          setGroupStatus={this.setGroupStatus.bind(this)}/>
        <GroupForm addGroup={this.addGroup.bind(this)} />
      </section>
    );
  }
}

export default Groups;
