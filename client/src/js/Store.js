import {createStore, applyMiddleware,compose} from "redux"
import thunk from "redux-thunk"
import reducer from './Reducer/reducer'

const middleware=[thunk]
const devtools =   window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (a) => a

const store = createStore(reducer,   compose(applyMiddleware(...middleware), devtools))


export default store