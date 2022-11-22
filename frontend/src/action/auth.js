import * as api from '../api';

export const signin = (formData,history) =>async (dispatch)=>{
   
    try{
        const {data} = await api.signIn(formData);
        dispatch({type:'AUTH',data});

        history('/chat');
    }
    catch(err){
        console.log(err.message);
    }
}
export const signup = (formData,history) =>async (dispatch)=>{
    try{
        const {data} = await api.signUp(formData);
    
        dispatch({type:'AUTH',data});
        
        history('/chat');
    }
    catch(err){
        console.log(err.message);
    }
}