import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})
const user = JSON.parse(localStorage.getItem('profile'));



export const fetchChats =()=>API.get('/api/chat');

//users
export const searchUser = (userId) => API.post('/chat', {userId});
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

//Chat 
