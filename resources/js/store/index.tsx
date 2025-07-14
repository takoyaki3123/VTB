
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer as user, testReducer as test, permissionReducer as permission } from './reducerList';
const rootReducer = combineReducers({user, test, permission});
const store = configureStore({reducer: rootReducer});
export type reducerType = ReturnType<typeof rootReducer>
export default store;