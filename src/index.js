class Event{
  constructor(){
    this._events = Object.create(null)
  }
  install(this){
    console.log(this)
  }
  // 准备个数据结构用于缓存订阅者信息
  on(type, callback){
    if(!(callback instanceof Function)){
      throw new Error('event on callback is not a Function')
    }
    // 当前事件是否存在 再决定是否做缓存
    if(this._events[type]){
      this._events[type].push(callback)
    } else {
      this._events[type] = [callback]
    }
  }

  emit(type, ...args){
    if(!type) return
    if(this._events && this._events[type].length){
      this._events[type].forEach((callback) => {
        callback.call(this, ...args)
      })
    }
  }

  off(type, callback){
    if(!(callback instanceof Function)){
      throw new Error('event off callback is not a Function')
    }
    if(this._events && this._events[type]){
      this._events[type] = this._events[type].filter((item) => {
        return item !== callback && item.link !== callback
      })
    }
  }

  once(type, callback){
    let foo = function(...args){
      callback.call(this, ...args)
      this.off(type, foo)
    }
    foo.link = callback
    this.on(type, foo)
  }
}
