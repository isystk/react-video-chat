import { css, keyframes } from '@emotion/css'

export const notion = css`
  width: 300px;
  & .myHeadPhoto {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    overflow: hidden;
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
  & .loading {
    margin: 20px auto 0;
    width: 16px;
  }
`
