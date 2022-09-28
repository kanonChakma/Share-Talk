import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import ChatBox from "../component/ChatBox";
import MyChats from "../component/MyChats";
import SideDrawer from "../component/SideDrawer";
import { ChatState } from "../context/ChatProvider";

const Chat = () => {
  const { user} = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer/>}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
         {user && <MyChats fetchAgain={fetchAgain}/>}
         {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
         )}
      </Box>
    </div>
  );
}



export default Chat;