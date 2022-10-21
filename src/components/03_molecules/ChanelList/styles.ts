import { css, keyframes } from '@emotion/css'

export const chanelList = css`
  overflow-y: scroll;
  background-color: #444444;
  & .tag {
    width: 100%;
    padding: 10px;
    display: flex;
    cursor: pointer;
    position: relative;
    &.active {
      background-color: #666666;
    }
    & .head {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      overflow: hidden;
    }
    & .head img {
      width: 100%;
    }
    & .text {
      width: 90%;
      margin-left: 10px;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    & .text .name {
      width: 90%;
      color: #fff;
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    & .text .dec {
      width: 100%;
      color: #888888;
      font-size: 13px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    & .num {
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 50%;
      background-color: rgb(10, 156, 200);
      color: #eee;
      font-size: 8px;
      text-align: center;
      position: absolute;
      right: 5%;
      top: 30%;
    }
  }
  @media screen and (min-width: 992px) {
    height: 100%;
  }
`
