import React, { Component } from 'react';
import Downloader from '../Services/Downloader';
import XMLConverter from '../Services/XMLConverter';
import CurrencyCollection from '../Services/CurrencyCollection';
import Exchanger from '../Services/Exchanger'
import Currency from '../Models/Currency';

const URL = 'http://api.nbp.pl/api/exchangerates/tables/A/'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      value: 0,
      from: 'PLN',
      to: 'USD',
      result: 0
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onCurrencyFromChange = this.onCurrencyFromChange.bind(this)
    this.onCurrencyToChange = this.onCurrencyToChange.bind(this)
    this.swap = this.swap.bind(this)

    this.gui = null
    this._init()
  }

  async _init(){
    this._currencyCollection = new CurrencyCollection(XMLConverter.createArray((await Downloader.getFile(URL)).data))
    this._currencyCollection.add(new Currency('polski złoty', 'PLN', 1))
    this.setState({ready: true})
  }

  onInputChange(event) {
    this.setState({value: event.target.value })
  }

  onCurrencyFromChange(event){
    this.setState({from: event.target.value})
  }

  onCurrencyToChange(event){
    this.setState({to: event.target.value})
  }

  swap(){
    this.setState({to: this.state.from, from: this.state.to})
  }
  

  render() {
    if (this.state.ready){

      let currencies = this._currencyCollection.getCollection().sort( (a ,b) =>{
        if(a.getCode() < b.getCode()) return -1;
        if(a.getCode() > b.getCode()) return 1;
        return 0;
      }).map((currency, i) => {
        return (
          <option value={currency.getCode()} key={i} >{`${currency.getCode()} - ${currency.getName()}`}</option>
        )
      })

      return (
        <div className="container" style={{'max-width': '40rem'}}>
          <div className="card border-info" >
            <h4 className="card-header bg-info text-white">Currency Converter</h4>
            <div className="card-body">
              <form>

                <div className='form-group'>
                  <label htmlFor="valueInput">Kwota</label>
                  <input className="form-control border-info" id="valueInput" type="text" name="value" onChange={this.onInputChange} value={this.state.value} />
                </div>

                <div className='form-group'>
                  <label htmlFor="currencyFromInput">Waluta</label>
                  <select className="form-control border-info" id="currencyFromInput" name="from" value={this.state.from} onChange={this.onCurrencyFromChange}>
                    {currencies}
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor="currencyToInput">Waluta docelowa</label>
                  <select className="form-control border-info" id="currencyToInput" name="to" value={this.state.to} onChange={this.onCurrencyToChange}>
                    {currencies}
                  </select>
                </div>
                
              </form> 
              
            </div>
            <div className="card-body">
              <p>
                {`${this.state.value ? this.state.value : 0} ${this.state.from} = ${Exchanger.convert(
                  this.state.value,
                  this._currencyCollection.getCurrencyByCode(this.state.from),
                  this._currencyCollection.getCurrencyByCode(this.state.to)
                )} ${this.state.to}`}
              </p> 
              <button className="btn btn-info" onClick={this.swap}>Zamień</button>
            </div>
          </div>
          
        </div>
      )
    }
    else{
      return (
        <div className="container" style={{'max-width': '40rem'}}>
          <div className="card bg-danger border-danger text-white text-center">
            <h5 className="card-body" >
              Nie udało się pobrać danych
            </h5>
          </div>
        </div>
      )
    }
  }
}
