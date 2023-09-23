import React from "react";

const Main = ({ index, username, message, createdDate }) => {
  return (
    <div className="chat-message" key={index}>
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <p>
            {username} - {createdDate}
          </p>
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
              {message}
            </span>
          </div>
        </div>
        <img
          src="./images/me.png"
          alt="My profile"
          className="w-6 h-6 rounded-full order-2"
        />
      </div>
    </div>
  );
};

export default Main;
