'use strict';

import React from "react";
import ReactDom from "react-dom" 
import './search.less';
import img from "../images/webpack.jpg"
import txt from "./hello.txt"
import { helloFun } from '../common'
import { funA } from './tree-shaking';
import largeNumberAdd from 'large-number-ccf';

class Search extends React.Component { 

  constructor() {
    super();
    this.state = {
      Text: null,

      
    };
  }
  loadComponent() {
    import('./async.js').then(Text => {
      this.setState({
        Text: Text.default
      })
    })
  }
  render() {
    helloFun();
    funA();
    console.log(largeNumberAdd(1,2))




    const a = 1;
    const b = 2;
    const c = a + b;

    if (false) {
      console.log('不可到达')
    }
    const { Text } = this.state;
    return (
      <div >
        <span className="search-text">{txt + a}</span>
        <img src={ img } className="search-img"></img>
        <button onClick={this.loadComponent.bind(this)}>动态</button>
        {  Text ? <Text /> : '' }
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