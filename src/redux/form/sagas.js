import { takeEvery, put } from 'redux-saga/effects'
import {
    FORM,
    FORM_SUCCESS
} from './actions'

function* handler() {
    yield takeEvery(FORM, form)
}

function* form(action) {
    const { fullname, email } = action.payload
    try {
      yield put({
        type: FORM_SUCCESS,
        payload: {
            fullname,
            email,
        },
      })
    } catch (error) {
      console.log('[Form Saga] form error: ', error)
    }
}

  export { handler }
  