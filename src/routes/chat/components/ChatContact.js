import React from "react";
import { UPLOAD_PIC } from "../../../constants/ActionType";
import logo from "../../../assets/logo1.png";
import { Badge } from "antd";

const ChatContact = ({
  item,
  onContactClick,
  selectedContactId,
  userDetail,
}) => {
  const bgColor =
    selectedContactId === item.reciever_id ||
    selectedContactId === item.sender_id
      ? "#f8f8f8"
      : "";

  return (
    <div
      className="chat-btm-cbms"
      onClick={() => onContactClick()}
      style={{ cursor: "pointer", backgroundColor: bgColor }}
    >
      <div className="chatimg-cbms">
        {userDetail &&
        userDetail.user &&
        userDetail.user.id !== item.reciever_id ? (
          <img
            src={
              item &&
              item.reciever_data &&
              item.reciever_data.get_user_details &&
              item.reciever_data.get_user_details.avatar != null
                ? UPLOAD_PIC + item.reciever_data.get_user_details.avatar
                : logo
            }
            alt="logo"
          ></img>
        ) : (
          <img
            src={
              item &&
              item.sender_data &&
              item.sender_data.get_user_details &&
              item.sender_data.get_user_details.avatar != null
                ? UPLOAD_PIC + item.sender_data.get_user_details.avatar
                : logo
            }
            alt="logo"
          ></img>
        )}
      </div>

      <div className="chattext-cbms">
        <div className="chattext-cbms-innerp">
          {userDetail &&
          userDetail.user &&
          userDetail.user.id !== item.reciever_id ? (
            <span>
              <span>
                {item && item.reciever_data && item.reciever_data.fname != ""
                  ? item.reciever_data.fname
                  : "N/A"}
              </span>
              <span> </span>
              <span>
                {item && item.reciever_data && item.reciever_data.lname != ""
                  ? item.reciever_data.lname
                  : "N/A"}
              </span>
            </span>
          ) : (
            <span>
              <span>
                {item && item.sender_data && item.sender_data.fname != ""
                  ? item.sender_data.fname
                  : "N/A"}
              </span>
              <span> </span>
              <span>
                {item && item.sender_data && item.sender_data.lname != ""
                  ? item.sender_data.lname
                  : "N/A"}
              </span>
            </span>
          )}

          <p>
            {item &&
            item.conversation_message_letest &&
            item.conversation_message_letest.message_text != ""
              ? item.conversation_message_letest.message_text
              : "N/A"}
          </p>
        </div>

        {item && item.unread_messages_count != 0 ? (
          <div className="unread-cbms">
            <Badge count={item.unread_messages_count} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatContact;
