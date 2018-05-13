import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from './logo.svg';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const collapsed = this.state.collapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark transparent-nav">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="container">
          <div className={`${classOne}`} id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" exact to="/">Devices</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" exact to="/group">Groups</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/logs">Logs</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default Nav;