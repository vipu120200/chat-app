    import { Box, Button } from '@chakra-ui/react'
    import { FormControl, FormLabel } from '@chakra-ui/form-control';
    import { useDisclosure } from '@chakra-ui/hooks'
    import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,Image,Text } from '@chakra-ui/react'
    import { useToast } from "@chakra-ui/toast";
    import React,{useState} from 'react'
    import axios from 'axios';
    import { Input } from '@chakra-ui/input';
    import UserListItem from '../User/UserListItem';
    import UserBadgeItem from '../User/UserBadgeItem';
    import * as api from '../../api';
    import { ChatState } from "../../Context/ChatProvider";


const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName,setGroupChatName] = useState();
    const [selectedUsers,setSelectedUsers] = useState([]);
    const [search,setSearch] = useState("");
    const [searchResult,setSearchResult] = useState([]);
    const [loading,setLoading] = useState([]);
    const loginUser = JSON.parse(localStorage.getItem('profile'));

    const {
        chats,
        setChats,
      } = ChatState();
    const toast =useToast();

    const handleSearch=async (query)=>{
        setSearch(query);
        if(!query)
        {
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
    const handleSubmit=async()=>{
        if(!groupChatName || !selectedUsers)
        {
            toast({
                title:"Please Fill All the Fields",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"top"
            });
            return;   
        }
        try {
            const {data} = await api.createGroup(groupChatName,JSON.stringify(selectedUsers.map((u)=>u._id)));
            
            setChats([data, ...chats]);
            onClose();
            toast({
                title:"New Group Chat Created",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });
        } catch (error) {
            toast({
                title:"Error Occured",
                description:"Failed to create group chat",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom-left"
            });
        }

    }
    const handleDelete=(delUser)=>{
        setSelectedUsers(selectedUsers.filter((sel)=>sel._id !== delUser._id));
    }

    const handleGroup=(userToAdd)=>{
            if(selectedUsers.includes(userToAdd))
            {
                toast({
                    title:"User Already Added",
                    status:"warning",
                    duration:5000,
                    isClosable:true,
                    position:"top"
                });
                return;
            }
            setSelectedUsers([...selectedUsers,userToAdd]);
    }


    return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize={"35px "} fontFamily="work sans" display={"flex"} justifyContent="center">Create Group</ModalHeader>
              <ModalCloseButton />
              <ModalBody display={"flex"} flexDir="column" alignItems={"center"}>
                <FormControl>
                    <Input placeholder="Chat Name" mb={3} onChange={(e)=>setGroupChatName(e.target.value)} />
                </FormControl>
                <FormControl>
                    <Input placeholder="Add Users" mb={1} onChange={(e)=>handleSearch(e.target.value)} />
                </FormControl>
                <Box w={100} display="flex" flexWrap="wrap">
                    {selectedUsers.map((u)=>(
                        <UserBadgeItem
                        key={u._id}
                        user={u}
                        handleFunction={()=>handleDelete(u)} 
                        />
                        ))}
                </Box>

                    {loading ? (
                        <div>Loading</div>
                    ):(
                        searchResult?.slice(0,4).map((user)=>(
                            <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)} />
                        ))
                    )
                }
               
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' onClick={handleSubmit}>
                  Create
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModal
