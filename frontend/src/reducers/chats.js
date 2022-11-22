const chats= (state={chats:[]},action) =>{
    switch (action.type) {
        case 'FETCH_USER_CHAT':
            // console.log(action.payload);
            return { ...state, users:action.payload.data };
            // return {users: [...state.users, ...action.payload.data]};
        default:
            return state;
    }
}

export default chats; 