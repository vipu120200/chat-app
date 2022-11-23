const chats= (state={chats:[],selectedChat:[],saveChat:[]},action) =>{
    switch (action.type) {
        case 'FETCH_USER_CHAT':

            return { ...state, users:action.payload.data };
            // return {users: [...state.users, ...action.payload.data]};
        case 'SAVE_CHAT':
       
            return { ...state, saveChat:action.payload.data };  
        case 'SAVE_SELECTED_CHAT':
       
            return { ...state, selectedChat:action.payload.data };
        default:
            return state;
    }
}

export default chats; 