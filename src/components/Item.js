import React from 'react';
import { FaTrash } from 'react-icons/fa';
export default class Item extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    // console.log(this.props.data.isCompleted);
    // console.log(this.props.id); //this is pulling as undefined...find a way to send it down properly,so that u can send it back up
    // console.log(this.props.isCompleted);
    const completedClass = this.props.isCompleted ? 'strike-out' : '';
    return (
      <li>
        {/* swtiched from onClick to onChange for checkbox property...was returning an error (line 18) */}
        {/* Try giving the Span element the onClick for the Item Update so that it updates in place..? */}
        <div className="item-container">
          <input
            onChange={() => this.props.onClickComplete(this.props.id)}
            type="checkbox"
            checked={this.props.isCompleted}
          />
          <span
            onClick={() => this.props.onClickEdit(this.props.id)}
            className={completedClass}
          >
            {this.props.task}
          </span>

          <FaTrash onClick={() => this.props.deleteItem(this.props.id)} />

          {/* <button onClick={() => this.props.onClickEdit(this.props.id)}>
            Edit
          </button> */}
        </div>
      </li>
    );
  }
}
