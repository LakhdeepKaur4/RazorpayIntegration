import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import payment from './paymentPage/reducer';


const reducers = combineReducers({
  menu,
  settings,
  payment
});

export default reducers;