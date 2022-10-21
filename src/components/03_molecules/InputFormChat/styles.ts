import { css, keyframes } from '@emotion/css'

export const chatInput = css`
  display: flex;
  background-color: #fff;
  overflow: hidden;
`

export const iconBlock = css`
  width: 320px;
  height: 110px;
  background-color: #fff;
  border: 1px solid #777;
  flex-wrap: wrap;
  position: absolute;
  bottom: 60px;
  left: 0;
  z-index: 1;
  display: flex;
  @media screen and (min-width: 992px) : {
    left: 310px;
  }
`

export const myIcon2 = css`
  padding: 19px 5px;
  text-align: center;
  cursor: pointer;
`

export const myIcon2Img = css`
  width: 24px;
  height: auto;
  margin: 10px;
`

export const sendMsg = css`
  margin: 12px !important;
`
