import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Avatar } from "@chakra-ui/avatar";
import { useEffect, useState } from "react";
import { getImage, getSender } from "../config/ChatLogics";
import ChatLoading from "./Layout/ChatLoading";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import * as api from '../api';
import GroupChatModal from "./Layout/GroupChatModal";
import groupImage from "../group.png";



const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();

  // const [selectedChat, setSelectedChat] = useState();
  // const [chats, setChats] = useState();

  const toast = useToast();
  const {
    setSelectedChat,
    selectedChat,
    chats,
    setChats,
  } = ChatState();

  const fetchChats = async () => {
    try {
      
      return await api.getUsers();

    } catch (error) {
      toast({
        title: "Error Occured new!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("profile")));
    fetchChats().then((chatData) =>setChats(chatData.data));

  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            Create Group
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats?.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
               
              >
                

<div style={{ display: "flex" }} >
            {!chat.isGroupChat ? 
                <Avatar
                // mt="7px"
                mr={1}
                size="sm"
                cursor="pointer"
                name={getSender(loggedUser, chat.users)}
                src= {getImage(loggedUser, chat.users)}
                /> : 
                <Avatar
                // mt="7px"
                mr={1}
                size="sm"
                cursor="pointer"
                name={chat.chatName}
                src= {groupImage}
                /> }
                <Text mt={1}>
                {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users).charAt(0).toUpperCase() + getSender(loggedUser, chat.users).slice(1)
                    : chat.chatName}
                </Text>
          </div>
                  

                {chat.latestMessage && (
                  <Text fontSize="xs" ml={"36px"}>
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
          ) : (
          <ChatLoading />
        )} 
      </Box>
    </Box>
  );
};

export default MyChats;