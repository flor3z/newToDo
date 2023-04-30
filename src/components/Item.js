import React from 'react';
// import { FaTrash } from 'react-icons/fa';
import { FaWindowClose } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task,
      isEditing: false,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleEdit() {
    console.log(this.state.isEditing);
    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  handleUpdateTodo(event) {
    event.preventDefault();
    this.props.onClickEdit(this.state.task, this.props.id);
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div className="edit-container">
          <form onSubmit={this.handleUpdateTodo}>
            <input
              className="edit-todo-input"
              maxLength={25}
              onChange={this.handleChange}
              name="task"
              value={this.state.task}
            />
            <button className="edit-todo-save" onClick={this.handleUpdateTodo}>
              Save
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <li
            className={
              this.props.isCompleted
                ? 'item-container completed-bg'
                : 'item-container'
            }
          >
            <input
              className="item-checkbox"
              onChange={() => this.props.onClickComplete(this.props.id)}
              type="checkbox"
              checked={this.props.isCompleted}
            />
            <span
              className={
                this.props.isCompleted
                  ? 'todo-text-value completed'
                  : 'todo-text-value'
              }
            >
              {this.props.task}
            </span>

            <div className="icon-contianer">
              <FaEdit className="icon edit" onClick={this.handleEdit} />

              <FaWindowClose
                className="icon close"
                onClick={() => this.props.deleteItem(this.props.id)}
              />
            </div>
          </li>
        </div>
      );
    }
  }
}
