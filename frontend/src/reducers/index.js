
import { combineReducers } from "redux";

import auth from './auth';
import chats from './chats';

export default combineReducers({
    chats,auth
})