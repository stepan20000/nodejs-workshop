import React, { Component } from 'react';
import LogsList from './LogsList';
import './logs.css';

class Logs extends Component {
  constructor(props) {
    super(props);
    this.state = { logs: [] };
    this.updateLogsList = this.updateLogsList.bind(this);
  }

  componentDidMount() {
    this.updateLogsList();
  }

  updateLogsList() {
    fetch('/api/logs')
      .then(res => res.json())
      .then((res) => {
        this.setState({ logs: res })
      });
  }

  clearLogs() {
    fetch( `api/logs`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(() => {
        this.updateLogsList();
      })
      .catch(err => console.log(err));
  }

  makeLogs(logs) {
    console.log(logs);
    if (!logs) {
      return [];
    }
    return logs.map(log => {
        log.creation = new Date(log.creation);
        return log;
      })
        .sort((a, b) => {
          return b.creation - a.creation;
        });
  }

  render() {
    return (
        <section className="container-fluid">
          <div className="button-wrapper">
            <button
              className="btn btn-secondary"
              onClick={this.clearLogs.bind(this)}>
                Clear Logs
            </button>
          </div>
          <LogsList logs={this.makeLogs.bind(this, this.state.logs)()} />
        </section>
    );
  }
}

export default Logs;
