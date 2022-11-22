import * as api from '../api';

export const findChat = (id,history) =>async (dispatch)=>{
   
    try{
        const {data} = await api.searchUser(id);
        // console.log(data);
        dispatch({type:'FETCH_USER_CHAT',payload:{data}});

        // history('/chat');
    }
    catch(err){
        console.log(err.message);
    }
}
    
