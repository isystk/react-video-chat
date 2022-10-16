import { css, keyframes } from '@emotion/css'

const useStyles = (theme) => css`{
  notion: {
    width: '300px',
    '& .myHeadPhoto': {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      margin: '0 auto',
      overflow: 'hidden',
    },
    '& .myHeadPhoto img': {
      width: '100%',
    },
    '& .myName': {
      width: '100%',
      fontSize: '24px',
      color: '#222222',
      textAlign: 'center',
      marginTop: '15px',
    },
    '& .btn': {
      width: '100%',
      textAlign: 'center',
    },
    '& .btn button': {
      margin: '25px 25px 5px',
    },
    '& .loading': {
      margin: '20px auto 0',
      width: '16px',
    },
  },
}`

export { useStyles }
