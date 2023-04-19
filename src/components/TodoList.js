import React from 'react';
import Item from './Item';
import { v4 as uuidv4 } from 'uuid';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemValue: '',
      itemList: [],
    };
    this.onTextChangeHandler = this.onTextChangeHandler.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onClickComplete = this.onClickComplete.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  componentDidMount() {
    const json = localStorage.getItem('itemList');
    const loadedItems = JSON.parse(json);

    if (loadedItems && loadedItems.length > 0) {
      this.setState({
        itemList: loadedItems,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.itemList !== this.state.itemList) {
      const temp = JSON.stringify(this.state.itemList);
      localStorage.setItem('itemList', temp);
    }
  }

  onTextChangeHandler(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  addItem(event) {
    event.preventDefault();

    const { itemValue } = this.state;
    const newTodo = {
      id: uuidv4(),
      isCompleted: false,
      text: itemValue.trim(),
    };

    if (newTodo.text.trim() !== '') {
      const updatedList = [...this.state.itemList, newTodo];
      this.setState({
        itemList: updatedList,
        itemValue: '',
      });
    }
  }

  deleteItem(id) {
    const newList = this.state.itemList.filter((item) => item.id !== id);
    this.setState({
      itemList: newList,
    });
  }

  onClickEdit(text, id) {
    const updatedTodos = this.state.itemList.map((item) => {
      if (item.id === id) {
        return { ...item, text: text };
      } else {
        return item;
      }
    });

    this.setState({
      itemList: updatedTodos,
    });
  }

  onClickComplete(id) {
    const newList = this.state.itemList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
        };
      } else {
        return item;
      }
    });

    this.setState({
      itemList: newList,
    });
  }

  render() {
    return (
      <div className="main-content-container">
        <div className="task-content">
          <label className="main-title">Tasks for the Day</label>
          <br />
          <div className="input-button-container">
            <form>
              <input
                maxLength={25}
                className="createTodo-input"
                value={this.state.itemValue}
                name="itemValue"
                type="text"
                placeholder="Add task..."
                onChange={this.onTextChangeHandler}
              />
              <button className="submitTodo-button" onClick={this.addItem}>
                Submit
              </button>
            </form>
          </div>
          <ul>
            {this.state.itemList.map((item) => {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  isCompleted={item.isCompleted}
                  task={item.text}
                  handleChange={this.onTextChangeHandler}
                  onClickComplete={this.onClickComplete}
                  deleteItem={this.deleteItem}
                  onClickEdit={this.onClickEdit}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
