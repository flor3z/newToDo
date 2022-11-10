import React from 'react';
import { FaTrash } from 'react-icons/fa';

export default class Item extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const completedClass = this.props.isCompleted ? 'strike-out' : '';
    return (
      <li>
        <div className="item-container">
          <input
            onChange={() => this.props.onClickComplete(this.props.id)}
            type="checkbox"
            checked={this.props.isCompleted}
          />
          <input
            className={completedClass}
            type="text"
            onChange={(e) =>
              this.props.onClickEdit(e.target.value, this.props.id)
            }
            value={this.props.task}
          />
          <FaTrash onClick={() => this.props.deleteItem(this.props.id)} />
        </div>
      </li>
    );
  }
}
