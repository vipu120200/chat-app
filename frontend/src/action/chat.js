import * as api from '../api';

export const searchUser = (search,history) =>async (dispatch)=>{
   
    try{
        const {data} = await api.searchUser(search);
        dispatch({type:'FETCH_BY_SEARCH',payload:{data}});

        history('/chat');
    }
    catch(err){
        console.log(err.message);
    }
}

