import { FORM_SUCCESS } from './actions'

const initialState = {
    fullname: undefined,
    email: null,
}
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FORM_SUCCESS:  
        if (action.payload.fullname !== undefined && action.payload.email) {
            state.fullname = action.payload.fullname
            state.email = action.payload.email
        }
        return { userToken: state.userToken,
            fullname: state.fullname,
            email: state.email,
        }
      default:
        return state
    }
  }
  
  export { reducer }
  