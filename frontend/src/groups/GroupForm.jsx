import React, { Component } from 'react';

class GroupForm extends Component {

  constructor(){
    super();
    this.name = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const name = this.name.current.value;
    this.props.addGroup(name);
  }

  render() {
    return (
      <form className="form-inline ml-5" onSubmit={this.onSubmit}>
        <div className="form-group mb-2">
          <label htmlFor={"groupName"} className="sr-only">Device Name</label>
          <input type="text" ref={this.name} className="form-control" id="groupName" placeholder="Group Name" />
        </div>
        <button type="submit" className="btn btn-primary mb-2">Add Group</button>
      </form>
    );
  }
}

export default GroupForm;
