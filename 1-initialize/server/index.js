if (typeof self === 'undefined') {
  global.self = {};
}


const express = require('express');
const SSR = require('../dist-ssr/search-server.js');
const app = express();
const { renderToString } = require('react-dom/server');
const path = require('path');
const fs = require('fs')
const template = fs.readFileSync(path.join(__dirname, '../dist-ssr/search.html'), 'utf-8');

app.use(express.static(path.join(__dirname,'../dist-ssr')));
app.use(express.static(path.join(__dirname,'../dist')));

app.get('/', function(req, res, next) {
  res.status(200);
  res.send('root');
})
app.get('/search', function(req, res, next) {
  res.status(200);
  const html = renderMark(renderToString(SSR));
  res.send(html);
})

const port = 3000
app.listen(port, () => {
  console.log('serve start ' + port)
})

// 加载html模板，并加载css样式
function renderMark(str) {
  return template.replace('<!-- HTML_PLACEHOLDER -->', str);
}