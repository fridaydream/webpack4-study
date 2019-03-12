import {isArray} from 'lodash-es'
import item from './sync.css'

const sync = function() {
  console.log('sync');
  fetch("/api/test")
  .then(response => response.json())
  .then((data) => console.log(data))
    setTimeout(() => {
      document.getElementById('app').innerHTML = `<h1 class="${item.test}">hello</h1>`
    }, 2000)
}
const isArray1 = (args) => {
  console.log(isArray(args));
}
export {
  sync,
  isArray1
}