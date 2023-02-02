import { compose, createStore } from 'redux'
import allReducers from './Components/reducers'

const composeEnhancers=
process.env.NODE_ENV!=='production' && 
typeof window==='object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose;

const configureStore=preloadedState=>(
    createStore(
        allReducers,
        preloadedState,
        composeEnhancers(),
    )
)

const store=configureStore({})

export default store
