import { css, keyframes } from '@emotion/css'

const useStyles = (theme) => css`{
  chanelList: {
    overflowY: 'scroll',
    backgroundColor: '#444444',
    '& .tag': {
      width: '100%',
      padding: '10px',
      display: 'flex',
      cursor: 'pointer',
      position: 'relative',
      '&.active': {
        backgroundColor: '#666666',
      },
      '& .head': {
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        overflow: 'hidden',
      },
      '& .head img': {
        width: '100%',
      },
      '& .text': {
        width: '90%',
        marginLeft: '10px',
        display: 'block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      '& .text .name': {
        width: '90%',
        color: '#fff',
        fontSize: '16px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      '& .text .dec': {
        width: '100%',
        color: '#888888',
        fontSize: '13px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      '& .num': {
        width: '20px',
        height: '20px',
        lineHeight: '20px',
        borderRadius: '50%',
        backgroundColor: 'rgb(10, 156, 200)',
        color: '#eee',
        fontSize: '8px',
        textAlign: 'center',
        position: 'absolute',
        right: '5%',
        top: '30%',
      },
    },
    '@media screen and (min-width:992px)': {
      height: '100%',
    },
  },
}`

export { useStyles }
