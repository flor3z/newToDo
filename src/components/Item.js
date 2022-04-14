import React from 'react';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>
        <input type="checkbox" />
        <span>{this.props.task}</span>
        <button>Delete</button>
        <button>update</button>
      </li>
    );
  }
}
