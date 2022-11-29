import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
  Text,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import React, { useState } from "react";
import { IconButton, Button } from "@chakra-ui/button";
import axios from "axios";
import { Input } from "@chakra-ui/input";
import UserListItem from "../User/UserListItem";
import UserBadgeItem from "../User/UserBadgeItem";
import * as api from "../../api";
import { ChatState } from "../../Context/ChatProvider";
import { ViewIcon } from "@chakra-ui/icons";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain ,fetchMessages}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setSelectedChat, selectedChat } = ChatState();

  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const loginUser = JSON.parse(localStorage.getItem('profile'));


  const toast = useToast();

  const handleAddUser =async (user1) => {
    
    if(selectedChat.users.find((u) => u._id === user1._id)) 
    {
      toast({
        title:"User Already in Group!",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom"
      });
    return;
    }
    if(selectedChat.groupAdmin._id !== loginUser.result._id) 
    {
        toast({
            title:"Only Admin Can Add Someone!",
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom"
          });
        return;
        }
        try {
      setLoading(true);

      const {data} = await api.addUser(selectedChat._id,user1._id);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);      
    } catch (error) {
      toast({
        title:"Error Occured",
        description:"Failed Add",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom-left"
    });
    setLoading(false);
    }
  };
  const handleRemove =async (user1) => {
    if(selectedChat.groupAdmin._id !== loginUser.result._id && user1._id !== loginUser.result._id) 
    {
      toast({
        title:"Only Admin Can Remove Someone!",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom"
      });
    }
    try {
      setLoading(true);

      const {data} = await api.removeUser(selectedChat._id,user1._id);
      user1._id === loginUser.result._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);      
    } catch (error) {
      toast({
        title:"Error Occured",
        description:"Failed Remove",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom-left"
    });
    setLoading(false);
    }
  }


  const handleRename =async () => {
    if(!groupChatName) return

    try{
        setRenameLoading(true);
        const {data} = await api.renameGroup(selectedChat._id,groupChatName);
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setRenameLoading(false);
    }catch(err){
        toast({
            title:"Error Occured",
            description:"Failed to load the search results",
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom-left"
        });
        setRenameLoading(false);
    }
    setGroupChatName("");
  };
  const handleSearch=async (query)=>{
    setSearch(query);
    if(!query)
    {
        return;
    }
    if(query == "")
    {
      setSearchResult();
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

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>

            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
                    <Spinner size="lg" />
                ):(
                    searchResult?.map((user)=>(
                        <UserListItem key={user._id} user={user} handleFunction={()=>handleAddUser(user)} />
                    ))
                )
            }

          </ModalBody>

          <ModalFooter>
            <Button onClick={() => handleRemove(loginUser.result)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
