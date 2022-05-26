import React from 'react';
// import ContentEditable from 'react-contenteditable';
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
          <input
            className={completedClass}
            type="text"
            onChange={(e) =>
              this.props.onClickEdit(e.target.value, this.props.id)
            }
            value={this.props.task}
          />
          {/* <ContentEditable
            className={completedClass}
            html={this.props.task} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            onChange={(e) => this.props.handleChange(e.target.value)} // handle innerHTML change
            tagName="article" // Use a custom HTML tag (uses a div by default)
          /> */}
          {/* <span
            onClick={() => this.props.onClickEdit(this.props.id)}
            className={completedClass}
          >
            {this.props.task}
          </span> */}

          <FaTrash onClick={() => this.props.deleteItem(this.props.id)} />

          {/* <button onClick={() => this.props.onClickEdit(this.props.id)}>
            Edit
          </button> */}
        </div>
      </li>
    );
  }
}
