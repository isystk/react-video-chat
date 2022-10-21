import { css, keyframes } from '@emotion/css'

export const notion = css`
  width: 300px;
  & .myHeadPhoto {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    overflow: hidden;
    & .photoEditBtn {
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 15px;
      background: #fff;
      opacity: 0.7;
      text-decoration: none;
      cursor: pointer;
      & input[type='file'] {
        display: none;
      }
    }
  }
  & .myHeadPhoto img {
    width: 100%;
  }
  & .myName {
    width: 100%;
    font-size: 24px;
    color: #222222;
    text-align: center;
    margin-top: 15px;
  }
  & .btn {
    width: 100%;
    text-align: center;
  }
  & .btn button {
    margin: 25px 25px 5px;
  }
`
