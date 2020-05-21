export default function Parallise<T> (fun : (resolve : (_ : T) => void, reject : (_ : any) => void) => any , __this? : object) : Promise<T> {
  const source : string = `
  'use strict';
  let iter;

  ${buildFun.toString()}
  this.onmessage = ${_onmessage.toString()}
  `
  const worker = new Worker(getWorkerURL(source))

  return new Promise((resolve, reject) => {
    worker.onmessage = message => {
      if (message.data.success) {
        resolve(message.data.result)
      } else {
        reject(message.data.error)
      }
    }

    worker.postMessage({
      fun: fun.toString(),
      __this: __this,
    })
  })

  function getWorkerURL (script : string) : string {
    return window.URL.createObjectURL(createTextFile(script))
  } 

  function createTextFile (content : BlobPart) : Blob {
    return new Blob([content], {
      type: 'text/plain'
    })
  }

  function _onmessage (this : Worker, message : MessageEvent) {
    const fun = buildFun(message.data.fun)
    const __this : any = message.data.__this
  
    fun.call(
      __this,
      (result : T) =>
        this.postMessage({result, success: true}),
      (error : any) => this.postMessage({error, success: false})
    )
  }
  
  function buildFun (fnStr : string) : Function {
    let fn = () => void 0
    eval('fn = ' + fnStr)
    return fn
  }
}