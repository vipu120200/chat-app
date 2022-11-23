
import { combineReducers } from "@reduxjs/toolkit";

import auth from './auth';
import chats from './chats';

const reducers = combineReducers({
    chats , auth
})

export default reducers;