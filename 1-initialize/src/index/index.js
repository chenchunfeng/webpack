import { helloFun } from '../common'

function hello() {
  return 'hello world'
}
helloFun()
let divDom = document.createElement("div");
divDom.innerHTML = hello();
console.log('hello')
