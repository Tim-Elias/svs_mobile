import { combineReducers } from 'redux'

import login from './login'
import general from './general'
import storage from './storage'
import disp from './disp'
// import get_manifest from './get_manifest'
// import manifest from './manifest'
// import reciept from './reciept'
// import send_manifest from './send_manifest'
// import mutual from './mutual'
// import create_disp from './create_disp'
// import upload_manifest from './upload_manifest'
// import my_disp from './my_disp'
// import order from './order'
// import templates from './templates'
// import home from './home'
// import disp_map from './disp_map'
// import home_ek from './home_ek'
// import test from './test'
// import storage_reciept from './storage_reciept'
// import movement from './movement'
// import check from './check'
// import m_create_disp from './m_create_disp'
// import calc_price from './calc_price'

export default combineReducers({

  login,
  general,
  storage,
  disp
  
})
