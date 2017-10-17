import parse from 'xml-parser'
import Currency from '../Models/Currency'

export default class XMLConverter {
  static createArray(XMLstring) {
    let currencyData = parse(XMLstring).root.children[0].children[3].children

    let currencyArray = []

    currencyData.forEach( currency => {
      let name = currency.children[0].content
      let code = currency.children[1].content
      let value = currency.children[2].content
      currencyArray.push(new Currency(name, code, parseFloat(value)))
    })
    
    return currencyArray
  }
}