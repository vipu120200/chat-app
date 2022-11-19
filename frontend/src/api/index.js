import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})



export const fetchChats =()=>API.get('/api/chat');

//users
export const searchUser = (search) => API.get(`/user?search=${search}`);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

//Chat 
