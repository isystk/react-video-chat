import { css, keyframes } from '@emotion/css'

const useStyles = (theme) => css`{
  chatInput: {
    display: 'flex',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  iconBlock: {
    width: '320px',
    height: '110px',
    backgroundColor: '#fff',
    border: '1px solid #777',
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: '60px',
    left: '0',
    zIndex: '1',
    display: 'flex',
    '@media screen and (min-width:992px)': {
      left: '310px',
    },
  },
  myIcon2: {
    padding: '19px 5px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  myIcon2Img: {
    width: '24px',
    height: 'auto',
    margin: '10px',
  },
  sendMsg: {
    margin: '12px !important',
  },
}`

export { useStyles }
