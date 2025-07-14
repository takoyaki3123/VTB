/* eslint-disable @typescript-eslint/no-explicit-any */
import objectAssign from 'object-assign';
import initialState from './stateList';

function userReducer(state = initialState.user, action: {type: string, vo: {[key:string]: any}}) {

  switch (action.type) {
    case "USER_UPDATE":
      return objectAssign({}, state, action.vo);    

    default:
      return state;
  }
}

function permissionReducer(state = initialState.permission, action: {type: string, vo: {[key:string]: any}}) {

    switch (action.type) {
      case "PERMISSION_UPDATE":
        return objectAssign({}, state, action.vo);    
  
      default:
        return state;
    }
  }


function testReducer(state = initialState.test, action: {type: string, vo: {[key:string]: any}}) {

    switch (action.type) {
      case "TEST_UPDATE":
        return objectAssign({}, state, action.vo);    
  
      default:
        return state;
    }
  }
export { userReducer, testReducer, permissionReducer }