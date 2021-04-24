import { combineReducers } from 'redux'
import { reducer as formReducer } from './form/reducers'

const reducer = combineReducers({
    form: formReducer,
})

export { reducer }