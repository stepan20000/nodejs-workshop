import React, {Component} from 'react';
import { Route } from "react-router-dom";
import './App.css';
import Devices from './devices/Devices';
import Logs from './logs/Logs';
import Nav from './Nav';
import Groups from './groups/Groups';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { devices: [], groups: [] };
  }

  componentDidMount() {
    this.updateDevicesFromBackEnd();
    this.updateGroupsFromBackEnd()
  }

  updateDevicesFromBackEnd() {
    fetch('/api/device')
      .then(res => res.json())
      .then((res) => {
        this.setState({ ...this.state, devices: res })
      });
  }

  updateGroupsFromBackEnd() {
    fetch('/api/group')
      .then(res => res.json())
      .then((res) => {
        this.setState({ ...this.state, groups: res });
      });
  }

  updateDevices(devices) {
    this.setState({ ...this.state, devices });
  }

  updateGroups(groups) {
    this.setState({ ...this.state, groups });
  }

  updateGroupsAndDevices(data) {
    this.setState({groups: data.groups, devices: data.devices});
  }

  render() {
    return (
      <div className="App">
        <Nav></Nav>
        <section className="App-intro">

          <Route exact
                 path="/"
                 render={(props) => <Devices {...props}
                                    devices={this.state.devices || []}
                                    updateDevices={this.updateDevices.bind(this)} />}/>
          <Route path="/logs" component={Logs} />
          <Route path="/group"
                 render={(props) => <Groups {...props}
                                    devices={this.state.devices}
                                    groups={this.state.groups}
                                    updateGroups={this.updateGroups.bind(this)}
                                    updateGroupsAndDevices={this.updateGroupsAndDevices.bind(this)}/> }/>
        </section>
      </div>
    );
  }
}

export default App;