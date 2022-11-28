import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})
const user = JSON.parse(localStorage.getItem('profile'));



// export const fetchChats =()=>API.get('/api/chat');

//users
export const searchUser = (userId) => API.post('/chat', {userId});
export const createGroup = (name,users) => API.post('/chat/group', {name,users});
export const renameGroup = (chatId,chatName) => API.put('/chat/rename', {chatId,chatName});
export const addUser = (chatId,userId) => API.put('/chat/groupadd', {chatId,userId});
export const removeUser = (chatId,userId) => API.put('/chat/groupremove', {chatId,userId});

export const sendMessage = (content,chatId) => API.post('/message', {content,chatId});
export const fetchMessages = (chatId) => API.get(`/message/${chatId}`);

export const getUsers = () => API.get('/chat');
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

//Chat 
