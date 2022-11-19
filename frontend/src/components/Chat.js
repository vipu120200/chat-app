import React, { useEffect ,useState} from 'react';
import {Container,Box,Text,Tabs,TabList,TabPanels,Tab,TabPanel} from '@chakra-ui/react';
import axios from 'axios';
import SideDrawer from './Layout/SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';

const Chat = () => {
 const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <div style={{width:"100%"}}>                
       {user  && <SideDrawer /> }
       <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
       {user  && <MyChats /> }
       {user  && <ChatBox /> }
       </Box>
    </div>
  )
}

export default Chat