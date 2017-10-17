import Exchanger from './Exchanger'

export default class GUI {
  constructor(collection){
    this._collection = collection
    this._exchanger = new Exchanger()
  }

  getCollection(){
    return this._collection
  }



  getExchanger(){
    return this._exchanger
  }

}