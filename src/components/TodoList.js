import React from 'react';
import Item from './Item';
import { v4 as uuidv4 } from 'uuid';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemValue: '',
      // itemSubmittedValue: '',
      itemList: [],
      id: '',
      // isCompleted: false,
    };
    this.onTextChangeHandler = this.onTextChangeHandler.bind(this);
    // this.onTextClickHandler = this.onTextClickHandler.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onClickComplete = this.onClickComplete.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  //************LifeCycle Methods here **************//
  //Error was here! Once the page was Refreshed and specifically the id value loadedItems.id( which can't be used b/c Arrry's dont have Id properties)
  //gave the id, the id based on the items "length" or position.
  componentDidMount() {
    const json = localStorage.getItem('itemList');
    const loadedItems = JSON.parse(json);

    //*******continue to experience an error with Id's matching up and dupliacting key's becomes the result********
    console.log(loadedItems);
    if (loadedItems && loadedItems.length > 0) {
      this.setState({
        itemList: loadedItems,
        // id: loadedItems.length,
      });
    }
  }
  //Figure Out how to send the ID to local storage so that it persists upon page refresh/revisit
  componentDidUpdate(prevProps, prevState) {
    // console.log(this.state.itemList, this.state);
    if (prevState.itemList !== this.state.itemList) {
      const temp = JSON.stringify(this.state.itemList);
      localStorage.setItem('itemList', temp);
    }
  }

  onTextChangeHandler(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,

      // itemValue: value,
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
        id: uuidv4(),
        itemValue: '',
      });
    }
  }

  //Keep testing (if it doesnt equal the ID it stays in original list, if it DOES equal, it gets filtered out!)
  deleteItem(id) {
    const newList = this.state.itemList.filter((item) => item.id !== id);
    this.setState({
      itemList: newList,
    });
  }

  onClickEdit(text, id) {
    const updatedTodos = this.state.itemList.map((item) => {
      if (item.id === id) {
        console.log(item.text, text, item, item.id, id);
        return { ...item, text: text };
      } else {
        return item;
      }
    });

    this.setState((prevState) => ({
      itemList: updatedTodos,
      id: prevState.id,
    }));
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
