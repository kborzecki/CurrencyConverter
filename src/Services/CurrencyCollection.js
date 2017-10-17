import Currency from '../Models/Currency'

export default class CurrencyCollection {
  constructor(collection = []) {
    this._collection = collection
  }

  getCurrencyByCode(code){
    let currencyToReturn = null
    this._collection.forEach(currency => {
      if (currency.getCode() == code)
        currencyToReturn = currency
    })
    return currencyToReturn ? currencyToReturn : new Currency()
  }

  getCollection(){
    return this._collection
  }

  add(currency){
    this._collection.push(currency)
  }

  setCollection(collection = undefined){
    if ( collection !== 'undefined' ) 
      this._collection = collection
  }
}