'use strict';

import React from "react";
import ReactDom from "react-dom" 
import './search.less';
import img from "./images/webpack.jpg"
import txt from "./hello.txt"

class Search extends React.Component {
  render() {
    return (
      <div >
        <span className="search-text">{txt}</span>
        <img src={ img } className="search-img"></img>
        <ButtonBox></ButtonBox>
      </div>
    );
  }
}

class ButtonBox extends React.Component {
  constructor() {
    super()
    this.state = {
      listItem: Array(1).fill(1),
    };
  }
  render() {
    return (
      <div>
        <button onClick={() => this.handlerClick()}>点击</button>
        <ListContent list={this.state.listItem}></ListContent>
      </div>
    );
  }
  handlerClick()  {
    let { listItem } = this.state;
    
    this.setState({
      listItem: [...listItem, Math.random()*10]
    })
    console.log(this.state.listItem)
  }
}

class ListContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let items = [];
    this.props.list.forEach((item,index) => {
      items.push(<div key={index}>{item}</div>);
    })

    return (
      <div className="item-color">{items}</div>
    );
  }
}
ReactDom.render(<Search />, document.getElementById('root'));