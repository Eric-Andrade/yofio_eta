import { takeEvery, put } from 'redux-saga/effects'
import {
    FORM,
    FORM_SUCCESS
} from './actions'

function* handler() {
    yield takeEvery(FORM, sendForm)
}

function* sendForm(action) {
    const { firstname, lastname, email, birthdate, image, location } = action.payload
    
    // console.log('[sendForm] data: ', { firstname, lastname, email, birthdate, image, location })
    try {
      yield put({
        type: FORM_SUCCESS,
        payload: {
            firstname, 
            lastname,
            email,
            birthdate,
            image, 
            location
        },
      })
    } catch (error) {
      console.log('[Form Saga] sendForm error: ', error)
    }
}

  export { handler }
  