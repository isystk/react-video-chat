import { css, keyframes } from '@emotion/css'

export const chatMessage = css`
  padding: 20px 20px 0 20px;
  background-color: #f1f1f1;
  & .message_row {
    display: grid;
    grid-template-columns: 70%;
    margin-bottom: 20px;
  }
  & .message-text {
    padding: 9px 14px;
    font-size: 16px;
    margin-bottom: 10px;
  }
  & .message-time {
    font-size: 12px;
    color: #777;
  }
  & .message-user {
    font-size: 12px;
    color: #777;
    width: 50px;
    text-align: center;
  }
  & .you-message {
    justify-content: end;
    & .message-content {
      justify-items: end;
      display: grid;
    }
    & .message-text {
      color: rgb(73, 73, 73);
      background-color: rgb(92, 238, 92);
      border: 1px solid rgb(92, 238, 92);
      border-radius: 14px 14px 0 14px;
    }
  }
  & .other-message {
    justify-items: start;
    & .message-content {
      grid-template-columns: 48px 1fr;
      grid-column-gap: 15px;
      display: grid;
    }
    & .message-text {
      color: #111;
      background-color: #eee;
      border: 1px solid #ddd;
      border-radius: 14px 14px 14px 0;
    }
    & .message-time {
      width: 66px;
      margin-left: 65px;
    }
  }
  & .head {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 5px;
  }
`
