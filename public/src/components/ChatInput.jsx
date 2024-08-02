import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }; 

  const handleEmojiClick = (emoji) => {
    console.log("Emoji clicked:", emoji); // Debugging line
    if (emoji) {
      let message = msg;
      message += emoji.emoji;
      setMsg(message);
    } else {
      console.error("Emoji object is undefined:", emoji); // Debugging line
    }
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  background-color: #080420;
  position: relative;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker {
        position: absolute;
        bottom: 100%;
        left: 0;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        z-index: 1; /* Ensure it appears above other elements */
        .emoji-picker-react {
          .emoji-scroll-wrapper::-webkit-scrollbar {
            background-color: #080420;
            width: 5px;
            &-thumb {
              background-color: #9a86f3;
            }
          }
          .emoji-categories {
            button {
              filter: contrast(0);
            }
          }
          .emoji-search {
            background-color: transparent;
            border-color: #9a86f3;
            color: white;
          }
          .emoji-group:before {
            background-color: #080420;
          }
        }
      }
    }
  }
  .input-container {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #ffffff34;
    border-radius: 2rem;
    padding: 0.5rem;
    input {
      flex: 1;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      background-color: #9a86f3;
      border: none;
      border-radius: 2rem;
      padding: 0.3rem 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
