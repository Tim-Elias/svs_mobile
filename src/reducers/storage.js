const initialState = {
  search: '',
  list: [],
  active: null,
  scann_active: false,
}

export default function dispatch (state = initialState, action) {
  switch (action.type) {
    case 'select_m_disp': return { ...state, list: [...state.list.map((el) => { 
      if (el.Number === action.payload) {
        return { ...el, selected: !el.selected }
      } else { 
        return el 
      } })] }
    case 'set_scann_active': return { ...state, scann_active: action.payload }
    case 'select_disp': return { ...state, list: [...state.list.map((el) => { if (el.Number === action.payload) { return { ...el, selected: true } } else { return el } })] }
    case 'set_list_storage': return { ...state, list: action.payload }
    case 'set_search_storagre': return { ...state, search: action.payload }
    case 'set_active_storage': return { ...state, active: action.payload }
    default: return state
  }
}
