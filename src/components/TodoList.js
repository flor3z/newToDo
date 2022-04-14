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
      isCompleted: false,
    };
    this.onTextChangeHandler = this.onTextChangeHandler.bind(this);
    // this.onTextClickHandler = this.onTextClickHandler.bind(this);
    this.addItem = this.addItem.bind(this);
  }
  onTextChangeHandler(event) {
    const { name, value } = event.target;
    console.log(name, value);
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
    const { itemValue, id, isCompleted } = this.state;
    const newTodo = {
      id: id,
      isCompleted: isCompleted,
      text: itemValue,
    };

    const updatedList = [...this.state.itemList, newTodo];

    this.setState({
      itemList: updatedList,
      id: id + 1,
      text: '',
      isCompleted: false,
    });
  }

  render() {
    return (
      <div className="main-content-container">
        <div className="task-content">
          <label>Tasks for the Day</label>
          <br />
          <input
            name="itemValue"
            type="text"
            placeholder="Tasks..."
            onChange={this.onTextChangeHandler}
          />
          <button onClick={this.addItem}>Submit</button>
          <ul>
            {/* contiune HERE.... FIND A WAY TO DISPALY THE CORRENT VALUES COMING FROM THE "ITEM" PARAMETER!! */}
            {this.state.itemList.map((item) => {
              return <Item key={item.id} task={item.itemValue} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}
