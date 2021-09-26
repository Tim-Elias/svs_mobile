const initialState = {
  search: '',
  error: ''

}

export default function dispatch (state = initialState, action) {
  switch (action.type) {
    case 'set_search_error': return { ...state, error: action.payload }
    case 'set_search_reciept': return { ...state, search: action.payload }

    default: return state
  }
}
