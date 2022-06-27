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
    // const tempItemList = this.state.itemList;
    // const itemFound = tempItemList.find((item) => {
    //   console.log(item.text);
    // });
    // console.log(newtext, text);
    //pass in old and new text from item.js

    //grab old text by using state variable in item.js (componentDID mount)

    //itemfound cannot be undefiend == must equal some value//

    //replace text of itemFound with new text.

    //final step update state with new itemlist console.log(tempItemList to confirm changes)//
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
    const { itemValue } = this.state;
    const newTodo = {
      id: uuidv4(),
      isCompleted: false,
      text: itemValue,
    };

    if (newTodo.text !== '') {
      const updatedList = [...this.state.itemList, newTodo];
      // console.log(updatedList);
      this.setState({
        itemList: updatedList,
        id: uuidv4(),
        itemValue: '',
        // isCompleted: false,
      });
    }

    //Pay Close attention to the way you created the newTodo! Remeber the Key names to properly select those values!!!!//
  }

  //Keep testing (if it doesnt equal the ID it stays in original list, if it DOES equal, it gets filtered out!)
  deleteItem(id) {
    const newList = this.state.itemList.filter((item) => item.id !== id);
    this.setState({
      itemList: newList,
    });
  }

  onClickEdit(text, id) {
    // First filter out the specific Item from the list that was clicked
    // const selectedItem = this.state.itemList.find((item) => item.id === id);

    // const filterListItems = this.state.itemList.filter(
    //   (item) => item.id !== id
    // );
    //Second, I need to filter out the text of that item to edit it
    //used prevState to make reference to previous value as was getting a Duplication Id Error --- I think its fixed?
    // this.setState((prevState) => ({
    //   itemList: filterListItems,
    //   itemValue: selectedItem.text,
    //   id: prevState.id,
    // }));

    const updatedTodos = this.state.itemList.map((item) => {
      if (item.id === id) {
        console.log(item.text, text, item, item.id, id);
        return { ...item, text: text };
      } else {
        return item;
      }
    });

    // console.log(itemToEdit);
    this.setState((prevState) => ({
      itemList: updatedTodos,
      id: prevState.id,
    }));
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
            placeholder="Add task..."
            onChange={this.onTextChangeHandler}
          />
          <button onClick={this.addItem}>Submit</button>
          <ul>
            {/* contiune HERE.... FIND A WAY TO DISPALY THE CURRENT VALUES COMING FROM THE "ITEM" PARAMETER!! */}
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
