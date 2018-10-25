import {
  sync
} from './components/sync/index.js';
console.log('123')

import(/* webpackChunkName: "async-test" */'./components/async/index.js')
  .then((_)=>{_.default.init()})

sync()
