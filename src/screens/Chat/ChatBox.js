import classes from "./chat.module.css";
import { AiOutlineSend } from "react-icons/ai";
import { useEffect, useState, useRef } from "react";
import { getCookie, postAsyncWithToken } from "../../constant/request";
import { io } from "socket.io-client";
import axios from "axios";
const ChatBox = ({ socket, ...props }) => {
  const userid = getCookie("userid");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const message = useRef();

  useEffect(() => {
    if (socket.current) {
      socket.current.on("message", (data) => {
        // if (data.from === userid || data.from === props.chatuserid) {
        setArrivalMessage({
          message: data.message,
          from: data.from,
          to: data.to,
        });
        // }
      });
      socket.current.emit("add-user", {
        userid: userid,
        chatuserid: props.chatuserid,
      });
    }
    async function getData() {
      const url = process.env.REACT_APP_BACK_END + "/chats/load-messages";
      const response = await postAsyncWithToken(url, {
        users: [userid, props.chatuserid],
      });
      setMessages(response.data.messages);
    }
    if (userid && props.chatuserid) {
      getData();
    } else {
      setMessages([]);
    }
  }, [props.chatuserid, props.chatUserName, userid]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  // console.log({ messages });

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_BACK_END + "/chats/send-messages";
    const msg = {
      from: userid,
      to: props.chatuserid,
      message: message.current.value,
    };

    const response = await postAsyncWithToken(url, msg);
    // console.log({ response });
    // console.log("click");
    // const m = {
    //   message: message.current.value,
    //   from: userid,
    //   to: props.chatuserid,
    // };
    // console.log({ m });
    if (response.status === 201) {
      socket.current.emit("sendmessage", msg);
      message.current.value = "";
      const msgs = [...messages];
      msgs.push(msg);
      setMessages(msgs);
    }
  };

  return (
    <>
      <div className="container">
        <div className={classes["central-meta"]} style={{ marginLeft: "10%" }}>
          <div className={classes["messages"]}>
            <div className={classes["message-box"]}>
              <div className={classes["peoples-mesg-box"]}>
                <div className={classes["conversation-head"]}>
                  <span>
                    <a>To: {props.chatUserName} </a>
                  </span>
                </div>
                <ul className={classes["chatting-area"]} id="message-template">
                  {messages?.map((msg) => {
                    if (msg.from === userid) {
                      return (
                        <li className={classes["me"]}>
                          <p style={{ padding: "10px" }}>{msg.message}</p>
                        </li>
                      );
                    } else {
                      return (
                        <li className={classes["you"]}>
                          <p style={{ padding: "10px" }}>{msg.message}</p>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
            <form onSubmit={submitHandler}>
              <div
                className="row"
                style={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <input
                  style={{
                    width: "90%",
                    height: "50px",
                    borderRadius: "10px",
                    borderWidth: "1px",
                    paddingLeft: "10px",
                  }}
                  ref={message}
                />
                <button
                  title="send"
                  type="submit"
                  style={{
                    borderRadius: "100%",
                    borderWidth: "1px",
                    marginLeft: "10px",
                    backgroundColor: "#7D9BF6",
                    width: "50px",
                  }}
                >
                  <AiOutlineSend style={{ color: "white" }} size={30} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
