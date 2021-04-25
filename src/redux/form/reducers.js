import { FORM_SUCCESS } from './actions'
import axios from 'axios'

const initialState = {
  firstname: null,
  lastname: null,
  email: null,
  birthdate: null,
  image: null,
  location: null
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_SUCCESS:
      if (action.payload.firstname !== null && action.payload.lastname !== null && action.payload.email !== null && action.payload.birthdate !== null) {
        state.firstname = action.payload.firstname
        state.lastname = action.payload.lastname
        state.email = action.payload.email,
        state.birthdate = action.payload.birthdate,
        state.image = action.payload.image,
        state.location = action.payload.location
        
        console.log('FORM_SUCCESS: ', {
          name: action.payload.firstname,
          lastName: action.payload.lastname,
          birthdate: action.payload.birthdate,
          photo: action.payload.image,
          location: {
            latitude: action.payload.location.getLatitude,
            longitude: action.payload.location.getLongitude
          }
        })
        
        axios.post('http://tech-challenge-v2.herokuapp.com/registration', {
          name: action.payload.firstname,
          lastName: action.payload.lastname,
          birthdate: action.payload.birthdate,
          photo: action.payload.image,
          location: {
            latitude: action.payload.location.getLatitude,
            longitude: action.payload.location.getLongitude
          }
        })
        .then(function (response) {
          console.log('[FORM_SUCCESS] Success: ', response);
        })
        .catch(function (error) {
          console.warn('[FORM_SUCCESS] Error: ', error);
        })
      }

      return {
          firstname: state.firstname,
          email: state.email,
      }
    default:
      return state
  }
}

export { reducer }
