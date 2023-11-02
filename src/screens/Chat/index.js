import { useEffect, useState } from "react";
import { yourChats } from "../../services/chat";
import { getCookie } from "../../constant/request";
import ChatCard from "./ChatCard";

const Chat = () => {
  const userid = getCookie("userid");
  const [chats, setChats] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await yourChats();
      // console.log({ response });
      if (response.data.chats) {
        setChats(response.data.chats);
      }
    }
    getData();
  }, []);
  console.log({ chats });

  return (
    <>
      <div style={{ marginTop: "25px" }}>
        {chats.map((chat) => {
          const user = chat.users.filter((u) => u._id !== userid);
          return (
            <ChatCard
              name={user[0].name}
              chatuserid={user[0]._id}
              key={chat._id}
              lastMessage={chat.lastMessage}
              time={chat.updatedAt}
              fromMe={chat.lastMessage.from === userid}
            />
          );
        })}
      </div>
    </>
  );
};
export default Chat;
