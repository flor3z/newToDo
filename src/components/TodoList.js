import React from 'react';
import Item from './Item';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemValue: '',
      // itemSubmittedValue: '',
      itemList: [],
      id: 0,
      // isCompleted: false,
    };
    this.onTextChangeHandler = this.onTextChangeHandler.bind(this);
    // this.onTextClickHandler = this.onTextClickHandler.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onClickComplete = this.onClickComplete.bind(this);
  }
  onTextChangeHandler(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      // itemValue: value,
    });
  }
  //contiune tomorrow here at submit handler...cant seem to display text on screen//
  // onTextClickHandler(e) {
  //   e.preventDefault();
  //   const submitTextVal = this.state.itemValue;
  //   console.log(submitTextVal);
  //   this.setState({
  //     itemSubmittedValue: submitTextVal,
  //   });
  // }
  //continue here ********** you have to make the button have the addItem method as the only onClick property...incorporate method above into this//
  addItem() {
    const { itemValue, id } = this.state;
    const newTodo = {
      id: id,
      isCompleted: false,
      text: itemValue,
    };
    //Pay Close attention to the way you created the newTodo! Remeber the Key names to properly select those values!!!!//
    const updatedList = [...this.state.itemList, newTodo];

    this.setState({
      itemList: updatedList,
      id: id + 1,
      itemValue: '',
      // isCompleted: false,
    });
  }
  //Created this new method below for Updating the Checked property based on the specifc Item...still needs work on switching its isCompleted status..
  onClickComplete(id) {
    const newList = this.state.itemList.map((item) => {
      // debugger;

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
    console.log(newList);
  }

  render() {
    return (
      <div className="main-content-container">
        <div className="task-content">
          <label>Tasks for the Day</label>
          <br />
          <input
            value={this.state.itemValue}
            name="itemValue"
            type="text"
            placeholder="Tasks..."
            onChange={this.onTextChangeHandler}
          />
          <button onClick={this.addItem}>Submit</button>
          <ul>
            {/* contiune HERE.... FIND A WAY TO DISPALY THE CORRENT VALUES COMING FROM THE "ITEM" PARAMETER!! */}
            {this.state.itemList.map((item) => {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  task={item.text}
                  onClickComplete={this.onClickComplete}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
