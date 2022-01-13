'use strict';

import React from "react";
import ReactDom from "react-dom" 
import './search.less';
import img from "./images/webpack.jpg"
import txt from "./hello.txt"

class Search extends React.Component {
  render() {
    return <div >
      <span className="search-text">{txt}</span>
      <img src={ img } className="search-img"></img>
      </div>
  }
}

ReactDom.render(<Search />, document.getElementById('root'));