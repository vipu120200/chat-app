import React from 'react';
import {useSelector} from 'react-redux';

const MyChats = () => {

  const authData = useSelector((state)=>state.chats);
  return (
    <div>MyChats</div>
  )
}

export default MyChats