import Parallise from './main'

Parallise(function(resolve : (_ : number) => void, reject : (_ : any) => void) {
    console.log("async parallel #1");

    for (let i = 0; i < 100000; ++i) {
      for (let e = 0; e < 20000; ++e) {
        // this simulates long running task - if you wait in devtools
        // you will see this promise is last resolved
        // it's proof that other promises executes parallely
      }
    }


    resolve(23);
  })
  .then((result : number) => {
    console.log("async main #1a " + result);
    return result * 2
  })
  .then(result => console.log('async main #1b ' + result));

console.log("synchronous main #1");

//
//
//

Parallise<number>((resolve) => (console.log("async parallel #2"), resolve(23)))
  .then((result : number) => {
    console.log("async main #2a " + result);
    return result * 2
  })
  .then((result : number) => console.log("async main #2b " + result));

console.log("synchronous main #2");

//
//
//

Parallise(function(this : {multiplier : number}, resolve : (_ : number) => void, reject) {
    console.log("async parallel #3");
    resolve(this.multiplier * 23);
  }, {
    multiplier: 4
  })
  .then(result => {
    console.log("async main #3a " + result);
    return result * 2
  })
  .then(result => console.log("async main #3b " + result));

console.log("synchronous main #3");