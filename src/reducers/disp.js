const today = new Date()
let mm = today.getMonth() + 1; // getMonth() is zero-based
let dd = today.getDate();

const y = today.getFullYear();

if (mm < 10) { mm = '0' + mm }
if (dd < 10) { dd = '0' + dd }

const date = y + '-' + mm + '-' + dd;

let H = today.getHours();
let M = today.getMinutes();

if (H < 10) { H = '0' + H }
if (M < 10) { M = '0' + M }

const time = H + ':' + M;

const initialState = {
  FIO_Customer: '',
  delivery_date: '',
  delivery_time: '',
  cash_accepted: 0,
  comment: '',
  type_cash: false,

  foto: '',
  cameraActive: false,
  
  popup: false,
  popup_message: false,

  is_new: false,
  action: null,
  key: {
    num:"",
    status:"",
  },
  data: {
    SendPhone:"",
    RecPhone:"",
  },
  cargo: [],
  show_history: false,
  history: [],
  history_loading: false,
  show_skan: false,
  skan_loading: false,
  skan: "",
  show_remove_modal: false,
  text_remove_modal: '',
  remove_modal_loading: false,
  remove_confirm: false,
  lat:'',
  lng:'',
  search_box:'',
  qr:'',
  print_check_disabled: true,
}

export default function dispatch (state = initialState, action) {
  switch (action.type) {
    case 'reset_data': return { ...state, foto: '', FIO_Customer: '', comment: '', cash_accepted: 0, type_cash: false }

    case 'set_key': return { ...state, key: { ...state.key, num: action.payload.num, status: action.payload.status } }

    case 'set_popup': return { ...state, popup: action.payload }
    case 'set_popup_message': return { ...state, popup_message: action.payload }
    case 'set_qr': return { ...state, qr: action.payload }
    case 'set_print_check_disabled': return { ...state, print_check_disabled: action.payload }
    case 'check_disable': return { ...state, data: { ...state.data, CheckEnabled: false} }

    case 'set_disp_foto': return { ...state, foto: action.payload }
    case 'set_camera_active': return { ...state, cameraActive: action.payload }

    case 'set_disp_comment': return { ...state, comment: action.payload }
    case 'set_disp_cash': return { ...state, cash_accepted: action.payload }
    case 'set_disp_FIO': return { ...state, FIO_Customer: action.payload }
    case 'set_disp_date': return { ...state, delivery_date: action.payload }
    case 'set_disp_time': return { ...state, delivery_time: action.payload }
    case 'set_disp_type_cash': return { ...state, type_cash: action.payload }

    case 'set_disp_lat_lng': return { ...state, lat: action.payload.lat, lng: action.payload.lng}
    case 'set_disp_search_box': return { ...state, search_box: action.payload}
    case 'set_disp_history_loading': return { ...state, history_loading: action.payload }
    case 'set_disp_history': return { ...state, history: action.payload }
    case 'set_disp_show_history': return { ...state, show_history: action.payload }

    case 'set_disp_skan_loading': return { ...state, skan_loading: action.payload }
    case 'set_disp_skan': return { ...state, skan: action.payload }
    case 'set_disp_show_skan': return { ...state, show_skan: action.payload }

    case 'set_disp_remove_modal_loading': return { ...state, remove_modal_loading: action.payload }
    case 'set_disp_text_remove_modal': return { ...state, text_remove_modal: action.payload }
    case 'set_disp_show_remove_modal': return { ...state, show_remove_modal: action.payload }

    case 'set_disp_remove_confirm': return { ...state, remove_confirm: action.payload }

    case 'set_data_disp': return { ...state, data: action.payload[0], cargo: action.payload[1],lat:action.payload[0].Lat, lng:action.payload[0].Lng, search_box: action.payload[0].RecCity + " "+ action.payload[0].RecAdress }
    case 'set_date_to_storage': return { ...state, getdispstatedateto: action.payload }
    case 'set_date_from_storage': return { ...state, getdispstatedatefrom: action.payload }
    case 'set_list_storage': return { ...state, list: action.payload }
    case 'set_active_storage': return { ...state, active: action.payload }
    case 'set_action': return { ...state, action: action.payload }
    default: return state
  }
}
