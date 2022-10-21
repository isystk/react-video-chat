import { css, keyframes } from '@emotion/css'

export const videoWrapper = css`
  width: 100%;
  height: 70vh;
  position: relative;
  overflow: hidden;
  & video,
  img {
    object-fit: cover;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
`
