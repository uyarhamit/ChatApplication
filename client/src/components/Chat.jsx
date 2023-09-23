import React, { useEffect, useState } from "react";
import { socket } from "../connection/socket-client";
import Visitor from "./Visitor";
import Main from "./Main";

const Chat = ({ username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
    socket.on("oldMessages", (data) => {
      data.forEach((item) => {
        setMessageList((prev) => [...prev, item]);
      });
    });
  }, [socket]);

  const sendMessage = () => {
    if (message !== "") {
      let json = { username, room, message };
      socket.emit("sendMessage", json);
      setMessage("");
      // setMessageList((prev) => [...prev, json]);
    }
  };

  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <img
              src="./images/me.png"
              alt="profile"
              className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">{username}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {messageList &&
          messageList.map((msg, index) => {
            msg.createdDate = msg.createdDate.replace(/T/, ' ').replace(/\..+/, '');
            return msg.username !== username ? (
              <Visitor
                index={index}
                username={msg.username}
                message={msg.message}
                createdDate={msg.createdDate}
              />
            ) : (
              <Main
                index={index}
                username={msg.username}
                message={msg.message}
                createdDate={msg.createdDate}
              />
            );
          })}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                sendMessage();
              }
            }}
            type="text"
            placeholder="Write your message!"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 bg-gray-200 rounded-md py-3"
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              onClick={sendMessage}
              type="button"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            >
              <span className="font-bold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
