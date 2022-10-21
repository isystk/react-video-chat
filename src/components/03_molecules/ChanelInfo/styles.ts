import { css, keyframes } from '@emotion/css'

export const meBlock = css`
  padding: 20px 10px;
  height: 100%;
  & .head-photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    overflow: hidden;
  }
  & .head-photo img {
    width: 100%;
  }
  & .name {
    width: 100%;
    font-size: 24px;
    color: #222222;
    text-align: center;
    margin-top: 15px;
  }
  & .title {
    width: 100%;
    font-size: 16px;
    color: #777777;
    text-align: center;
    margin-top: 5px;
  }
  & .video {
    width: 100%;
    text-align: center;
    margin-top: 5px;
  }
  & .video a {
    color: #777777;
  }
  & .video svg {
    font-size: 2.5em;
  }
`
