import {isArray} from 'lodash'
import item from './sync.css'
const sync = function() {
  console.log('sync');
  document.getElementById('app').innerHTML = `<h1 class="${item.test}">hello</h1>`
}
const isArray1 = (args) => {
  console.log(isArray(args));
}
export {
  sync,
  isArray1
}