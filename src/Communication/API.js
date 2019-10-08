import axios from 'axios';
import Constants from '../Utils/Constants';

const API = {

  getCryptocurrencyList: async function(start, limit, convert = 'USD'){
    let returnObject = {
      success: '0'
    };
    try {
      const qs = `start=${start}&limit=${limit}&convert=${convert}`;
      const url = Constants.ApiServer + Constants.ApiEndpointForCryptocurrencyListings + '?'+qs;
      const response = await this.doGetRequest(url);
      returnObject = response;
    } catch(e){
      console.warn("err10001", e.message);
    }
    return returnObject;
  },
  getCryptocurrencyMetadata: async function(id){
    let returnObject = {
      success: '0'
    };
    try {
      const qs = `id=${id}`;
      const url = Constants.ApiServer + Constants.ApiEndpointForCryptocurrencyMetadata + '?'+qs;
      const response = await this.doGetRequest(url);
      returnObject = response;
    } catch(e){
      console.warn("err10008", e.message);
    }
    return returnObject;
  },

  // GET, POST Methods //
  doGetRequest: async function(url){
    let returnObject = {
      success: '0'
    }
    try {

      if (Constants.showAPILogs){
        console.warn("API1: GET:", url, (new Date()).toISOString());
      }
      const response = await axios({
        method: 'GET',
        url: url,
        headers: {
          'Accept': 'application/json',
          'X-CMC_PRO_API_KEY': Constants.SecretKey
        },
        validateStatus: false
      });
      returnObject = {
        success: '1',
        statusCode: response.status,
        ...response.data
      }

      if (Constants.showAPILogs){
        console.warn("API0: GET", returnObject, (new Date()).toISOString());
      }

    } catch(e){
      console.warn("err10000", e.message);
    }
    return returnObject;
  },

}

export default API;
