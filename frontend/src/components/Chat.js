import React, { useEffect ,useState} from 'react';
import {Container,Box,Text,Tabs,TabList,TabPanels,Tab,TabPanel} from '@chakra-ui/react';
import axios from 'axios';
import SideDrawer from './Layout/SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';

const Chat = () => {
 const user = JSON.parse(localStorage.getItem('profile'));
 const [fetchAgain,setFetchAgain] = useState(false);

  return (
    <div style={{width:"100%"}}>                
       {user  && <SideDrawer /> }
       <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
       {user  && <MyChats fetchAgain={fetchAgain} /> }
       {user  && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> }
       </Box>
    </div>
  )
}

export default Chat