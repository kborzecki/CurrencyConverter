import axios from 'axios'

export default class Downloader{
  static getFile(url){
    return axios.get(url, { headers: { 'Accept': 'application/xml' } })
  }
}