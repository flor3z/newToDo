import React from 'react';
import { FaTrash } from 'react-icons/fa';

export default class Item extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    console.log(this.props.task);

    return (
      <li className={this.props.isCompleted ? 'completed-todo' : null}>
        <div className="item-container">
          <input
            className="item-checkbox"
            onChange={() => this.props.onClickComplete(this.props.id)}
            type="checkbox"
            checked={this.props.isCompleted}
          />
          <input
            maxLength={25}
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
