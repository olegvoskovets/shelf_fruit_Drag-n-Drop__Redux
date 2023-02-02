import {combineReducers} from 'redux'
import FruitsReducers from './fruits_reducers'
import BoxsReducers from './boxs_reducers'
import ShelfsReducers from './shelfs_redusers'

 const allReducers=combineReducers({
   fruits: FruitsReducers,
   boxs:BoxsReducers,
   shelfs:ShelfsReducers
})
export default allReducers