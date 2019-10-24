import axios from 'axios';

import{PAYMENT_DATA,ADD_CARD,GET_CARD,URN} from '../actions';


export function getData(){
    
  const request = axios.get(`${URN}/get/card/linked`)
    .then(response => response.data)
    return {
        type: PAYMENT_DATA,
        payload: request
    }
}

export function addCard(values){
  console.log('action reached',values);
  
const request = axios.post(`${URN}/save/card/data`,values)
  .then(response => response.data)
  return {
      type: ADD_CARD,
      payload: request
  }
}

export function getCard(user){
    console.log(user);
  const request = axios.get(`${URN}/card/${user}`)
    .then(response => response.data)
    return {
        type: GET_CARD,
        payload: request
    }
}