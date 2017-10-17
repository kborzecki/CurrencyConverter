export default class Exchanger {
  static convert(value, currencyFrom, currencyTo){
    console.log(currencyTo)
    console.log(`${value} * ${currencyFrom.getValue()} / ${currencyTo.getValue()} = ${value * currencyFrom.getValue() / currencyTo.getValue()}`)
    return value * currencyFrom.getValue() / currencyTo.getValue()
  }
}