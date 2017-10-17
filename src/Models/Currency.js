export default class Currency {
  constructor(name = null, code = null, value = null) {
    this._name = name
    this._code = code
    this._value = value
  }

  getName(){
    return this._name
  }

  getCode(){
    return this._code
  }

  getValue(){
    return this._value
  }

  setName(name = undefined){
    if(name !== 'undefined')
      this._name = name
  }

  setCode(code = undefined){
    if(code !== 'undefined')
      this._code = code
  }

  setValue(value = undefined){
    if(value !== 'undefined')
      this._value = value
  }
}