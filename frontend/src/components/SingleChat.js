import { Box, FormControl, Input, Spinner, Text } from '@chakra-ui/react';
import React,{useState,useEffect} from 'react'
import { ChatState } from '../Context/ChatProvider';
import { IconButton ,Button } from '@chakra-ui/button'
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender,getSenderFull } from '../config/ChatLogics';
import ProfileModal from './Layout/ProfileModal';
import * as api from '../api';
import UpdateGroupChatModal from './Layout/UpdateGroupChatModal';
import { useToast } from "@chakra-ui/toast";
import './Styles.css';
import ScrollableChat from './ScrollableChat';


const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  const [messages,setMessages]      = useState([]);
  const [loading,setLoading]        = useState(false);
  const [newMessage,setNewMessage]  = useState('');
  
  const toast = useToast();

  const user= JSON.parse(localStorage.getItem("profile"));
    const {
        setSelectedChat,
        selectedChat
      } = ChatState();

      const fetchMessages =async ()=>{

        if(!selectedChat) return;
        try {
          setLoading(true);
          const {data} = await api.fetchMessages(selectedChat._id);
          setMessages(data);
          setLoading(false);

        } catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to Load Message",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      }
      useEffect(()=>{
        fetchMessages();
      },[selectedChat]);

      const sendMessage =async (event)=>{
        if(event.key === "Enter" && newMessage)
        {
         
          try {
            setNewMessage("");
            const {data} = await api.sendMessage(newMessage,selectedChat._id);
         
            setMessages([...messages,data])
          } catch (error) {
            toast({
              title: "Error Occured!",
              description: "Failed to Send Message",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
        }
        
      }
      const typingHandler=(e)=>{
          setNewMessage(e.target.value);
      }

  return (
    <>
      {selectedChat ? (
        <>
        <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
             <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ?(
                <>
                {getSender(user,selectedChat.users)}
                <ProfileModal user={getSenderFull(user,selectedChat.users)} />
                </>
            ):(
                <>
                {selectedChat.chatName.toUpperCase()}
                {<UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />}
                </>
            )
            }
        </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (<Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" /> ) :
            (
              <div className='messages'>
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input variant="filled" bg="#E0E0E0" placeholder="Enter a Message" onChange={(e)=>{  setNewMessage(e.target.value)}} value={newMessage} />
            </FormControl>
          </Box>
        </>
      ):(
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
         <Text fontSize="3xl" pb={3} fontFamily="Work sans">
          Click on a user to start chatting
         </Text>
        </Box>
      )
    }
    </>
  )
}

export default SingleChat
