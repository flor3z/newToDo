import React from 'react';

export default class Item extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    // console.log(this.props.data.isCompleted);
    console.log(this.props.data.id); //this is pulling as undefined...find a way to send it down properly,so that u can send it back up
    return (
      <li>
        <input
          onClick={() => this.props.onClickComplete(this.props.data.id)}
          type="checkbox"
          checked={this.props.isCompleted}
        />
        <span>{this.props.task}</span>
        <button>Delete</button>
        <button>update</button>
      </li>
    );
  }
}
