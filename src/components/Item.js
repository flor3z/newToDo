import React from 'react';

export default class Item extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    // console.log(this.props.data.isCompleted);
    // console.log(this.props.id); //this is pulling as undefined...find a way to send it down properly,so that u can send it back up
    console.log(this.props.isCompleted);
    const completedClass = this.props.isCompleted ? 'strike-out' : '';
    return (
      <li>
        {/* swtiched from onClick to onChange for checkbox property...was return an error */}
        <div className="item-container">
          <input
            onChange={() => this.props.onClickComplete(this.props.id)}
            type="checkbox"
            checked={this.props.isCompleted}
          />
          <span className={completedClass}>{this.props.task}</span>
          <button onClick={() => this.props.deleteItem(this.props.id)}>
            Delete
          </button>
          <button>Update</button>
        </div>
      </li>
    );
  }
}
