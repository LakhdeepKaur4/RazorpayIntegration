import axios from 'axios';

import{PAYMENT_DATA,ADD_CARD,GET_CARD} from '../actions';


export function getData(){
    
  const request = axios.get(`http://192.168.0.107:8000/api/get/card/linked`)
    .then(response => response.data)
    return {
        type: PAYMENT_DATA,
        payload: request
    }
}

export function addCard(values){
  console.log('action reached',values);
  
const request = axios.post(`http://192.168.0.107:8000/api/save/card/data`,values)
  .then(response => response.data)
  return {
      type: ADD_CARD,
      payload: request
  }
}

export function getCard(user){
    console.log(user);
  const request = axios.get(`http://192.168.0.107:8000/api/card/${user}`)
    .then(response => response.data)
    return {
        type: GET_CARD,
        payload: request
    }
}