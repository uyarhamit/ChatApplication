import React from "react";

const Visitor = ({ index, username, message, createdDate }) => {
  return (
    <div className="chat-message" key={index}>
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <p>
            {username} - {createdDate}
          </p>
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
              {message}
            </span>
          </div>
        </div>
        <img
          src="./images/client.png"
          alt="profile"
          className="w-6 h-6 rounded-full order-1"
        />
      </div>
    </div>
  );
};

export default Visitor;
