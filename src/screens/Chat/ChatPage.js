import ChatCard from "./ChatCard";
import { useEffect, useState, useRef } from "react";
import { getAsync, getCookie } from "../../constant/request";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import ChatBox from "./ChatBox";
import { getAsyncWithToken } from "../../constant/request";

const ChatPage = () => {
  let { id } = useParams();
  const socket = useRef();
  const [chatUser, setChatUser] = useState(null);
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_BACK_END);
    async function getData() {
      const response = await getAsync(
        process.env.REACT_APP_BACK_END + "/users/" + id
      );
      if (response.data.user) {
        setChatUser(response.data.user);
      }
    }
    getData();
  }, []);
  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <ChatBox
          chatuserid={id}
          chatUserName={chatUser?.name}
          socket={socket}
        />
      </div>
    </>
  );
};
export default ChatPage;
