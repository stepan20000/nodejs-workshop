import React, { Component } from 'react';

class LogsList extends Component {

  renderLog(index) {
    const log = this.props.logs[index];

    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{log.name}</td>
        <td>{log.previousState ? "On" : "Off" }</td>
        <td>{log.nextState  ? "On" : "Off" }</td>
        <td>{log.creation.toLocaleString('ru', {hour12: false})}</td>
      </tr>
    );
  }

  render() {
    const logsList = this.props.logs
      .map((log, index) => this.renderLog(index));

    return (
      <table className="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Device Name</th>
          <th scope="col">Previous State</th>
          <th scope="col">Next State</th>
          <th scope="col">Date</th>
        </tr>
        </thead>
        <tbody>
        { logsList }
        </tbody>
      </table>
    );
  }
}

export default LogsList;