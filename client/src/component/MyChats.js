import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Avatar, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";
import { fetchAllChats } from "../common/chatApi";
import { getSender, getSenderPic } from "../config/ChatLogics";
import { ChatState } from "../context/ChatProvider";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState("");
  const [allChats, setAllChats] = useState(""); 
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();
  const fetchChats = async () => {
    try {
      const { data } = await fetchAllChats(user);
      setAllChats(data)
      setChats(data);
      console.log(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
 
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      color="white"
      p={3}
      background= ""
      backgroundColor="#6C5B7B"
      bg="white"
      boxShadow=" rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
      w={{ base: "100%", md: "31%" }}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize={{ base: "2xl", md: "12px", lg: "2xl" }}> My Chats</Text>
        <GroupChatModal>
          <Button
            d="flex"
            backgroundColor="#5c4e69"
            _hover={{bg: "#5c4e69",color:"tomato"}}
            fontSize={{ base: "15px", md: "10px", lg: "15px" }}
            rightIcon={<AddIcon />}
          >
              New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {allChats ? (
          <Stack overflowY="scroll">
            {allChats.map((chat) => (
              <Box
                display="flex"
                alignItems="center"
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#5c4e69"}
                color={selectedChat === chat ? "white" : "white"}
                px={3}
                py={2}
                borderRadius="sm"
                key={chat._id}
              >
              <Avatar
                  mr={2}
                  size="md"
                  name={chat.username}
                  src={getSenderPic(loggedUser, chat)}
                />
                <Box>
                   <Text>
                  {!chat.isGroupChat
                   ? getSender(loggedUser, chat.users)
                   : chat.chatName}
                   </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.username} : </b>
                      {chat.latestMessage.pic && "sent a image "}
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
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