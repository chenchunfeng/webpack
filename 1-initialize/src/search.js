'use strict';

import React from "react";
import ReactDom from "react-dom" 
import './search.less';
import img from "./images/webpack.jpg"

class Search extends React.Component {
  render() {
    return <div >
      <span className="search-text">测试</span>
      <img src={ img }></img>
      </div>
  }
}

ReactDom.render(<Search />, document.getElementById('root'));