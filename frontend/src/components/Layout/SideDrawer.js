    import React,{useState} from 'react';
import {Tooltip,Box,Text,TabList,TabPanels,Tab,TabPanel, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Input} from '@chakra-ui/react';
import {MenuButton, MenuList, Menu,MenuItem,MenuDivider} from '@chakra-ui/menu';
import {Avatar} from '@chakra-ui/avatar';
import { useDisclosure } from '@chakra-ui/hooks'
import {BellIcon,ChevronDownIcon} from '@chakra-ui/icons';
import {Button} from '@chakra-ui/button';
import ProfileModal from './ProfileModal';
import {useNavigate} from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import { findChat } from '../../action/chat';
import ChatLoading from './ChatLoading';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import UserListItem from '../User/UserListItem';
import { ChatState } from "../../Context/ChatProvider";
import * as api from '../../api';
import { getSender } from '../../config/ChatLogics';
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";


const SideDrawer = () => {
    const loginUser = JSON.parse(localStorage.getItem('profile'));
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [search,setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const [loadingChat,setLoadingChat] = useState("");
    const navigate = useNavigate(); 
    const toast = useToast();
    const dispatch = useDispatch();
    
   

    const {
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification
      } = ChatState();

    const logoutHandler =()=>{
        localStorage.removeItem('profile');
        navigate('/');
    }
    const accessChat =async (userId)=>{
        try{
            setLoading(true);
            const config = {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${loginUser.result.token}`,
                },
              };
              const {data} = await api.searchUser(userId);
        
              if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
              setSelectedChat(data);
              setLoadingChat(false);
              onClose();

        }catch(err)
        {
            toast({
                title:"Error Occured",
                description:"Failed to load the search results",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom-left"
            });
        }
       
    }
    const handleSearch =async  ()=>{
       if(!search){
        toast({
            title:"Please Enter Name or Email of User To Search",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"top-left"
        });
        return;
       }
       try{
        setLoading(true);
        const config = {
            headers: {
              Authorization: `Bearer ${loginUser.token}`,
            },
          };
    
          const { data } = await axios.get(`/user?search=${search}`, config);
          
          setLoading(false);
          setSearchResult(data);

       }catch(err){
        toast({
                    title:"Error Occured",
                    description:"Failed to load the search results",
                    status:"error",
                    duration:5000,
                    isClosable:true,
                    position:"bottom-left"
                });
       }
    }


  return (
    <>
        <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
            <Tooltip label="Search Users To Chat" hasArrow placement="bottom-end">
                <Button variant="ghost" onClick={onOpen}>
                    <i className="fa fa-search"></i>
                    <Text display={{ base: "none",md:"flex"}} px="4">
                        Search User
                    </Text>
                </Button>
            </Tooltip>
            <Text fontSize="2xl" fontFamily="work sans">
                Chat App
            </Text>
            <div>
                <Menu>
                <MenuButton p={1}>
                    <NotificationBadge
                        count={notification.length}
                        effect={Effect.SCALE}
                    />
                    <BellIcon fontSize="2xl" m={1} />
                </MenuButton>
                    <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(loginUser, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
                </Menu>
                <Menu>
                     <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Avatar size="sm" cursor="pointer" name={loginUser.result.name} src={loginUser.result.pic} />
                    </MenuButton>   
                    <MenuList>
                        <ProfileModal user={loginUser.result}>
                            <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                        <MenuDivider />
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>

        <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search User</DrawerHeader>

            <DrawerBody>
               <Box display={"flex"} pb={2}>
                <Input placeholder="Search by name or email" mr={2} value ={search} onChange={(e)=>setSearch(e.target.value)}/>
                <Button 
                onClick={handleSearch}
                >Go</Button>
               </Box>
               {loading ? <ChatLoading /> : (searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
               )))}
            </DrawerBody>

            {/* <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
                </Button>
                <Button colorScheme='blue'>Save</Button>
            </DrawerFooter> */}
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default SideDrawer