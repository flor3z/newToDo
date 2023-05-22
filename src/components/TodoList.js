import React from 'react';
import Item from './Item';
import { v4 as uuidv4 } from 'uuid';
import ReactSwitch from 'react-switch';
// import { FaSun } from 'react-icons/fa';
import { BsFillSunFill } from 'react-icons/bs';
import { FaMoon } from 'react-icons/fa';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemValue: '',
      itemList: [],
      theme: 'dark',
    };
    this.onTextChangeHandler = this.onTextChangeHandler.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onClickComplete = this.onClickComplete.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onToggleTheme = this.onToggleTheme.bind(this);
  }

  onToggleTheme() {
    if (this.state.theme === 'light') {
      this.setState({
        theme: 'dark',
      });
    } else {
      this.setState({
        theme: 'light',
      });
    }
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
    const { theme } = this.state;
    return (
      <div id={theme}>
        <div className="switch">
          <ReactSwitch
            uncheckedIcon={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  fontSize: 15,
                  color: 'orange',
                  paddingRight: 2,
                }}
              >
                <FaMoon />
              </div>
            }
            checkedIcon={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  fontSize: 20,
                  color: 'yellow',
                  paddingRight: 2,
                }}
              >
                <BsFillSunFill />
              </div>
            }
            onChange={this.onToggleTheme}
            checked={theme === 'dark' ? true : false}
          />
        </div>
        <div className="main-content-container">
          <div className="task-content">
            <label className="main-title">Daily Tasks</label>
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
      </div>
    );
  }
}
