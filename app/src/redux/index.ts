import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import  { reducer }  from './reducer'
import thunk from 'redux-thunk'



export const store = createStore(reducer, compose(applyMiddleware(thunk)))