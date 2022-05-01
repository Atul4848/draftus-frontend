import React from "react";
import { useDispatch } from "react-redux";
import {
  getConversation,
  getMessage,
  seenChat,
} from "../../../redux/actions/chatAction";
import ChatContact from "./ChatContact";

const ConversationList = ({
  get_conversation,
  setSelectedId,
  selectedId,
  userDetail,
}) => {
  const dispatch = useDispatch();

  const selectFromConversation = async (idOfSelected, c_id) => {
    await dispatch(getMessage(idOfSelected));
    setSelectedId(idOfSelected);
    await dispatch(seenChat(c_id));
    await dispatch(getConversation());
  };

  return (
    <div className="my-conversation-ncc">
      <div className="scroll-chat-sc">
        {get_conversation &&
          get_conversation.map((item) => (
            <ChatContact
              userDetail={userDetail}
              selectedContactId={selectedId}
              item={item}
              onContactClick={() =>
                selectFromConversation(
                  userDetail &&
                    userDetail.user &&
                    userDetail.user.id !== item.reciever_id
                    ? item.reciever_id
                    : item.sender_id,
                  item &&
                    item.conversation_message_letest &&
                    item.conversation_message_letest.c_id != ""
                    ? item.conversation_message_letest.c_id
                    : "N/A"
                )
              }
            />
          ))}
      </div>
    </div>
  );
};

export default ConversationList;
