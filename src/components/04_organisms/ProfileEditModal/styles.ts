import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  notion: {
    width: '300px',
    '& .myHeadPhoto': {
      position: 'relative',
      width: '100px',
      height: '100px',
      // borderRadius: '50%',
      margin: '0 auto',
      overflow: 'hidden',
      '& .photoEditBtn': {
        position: 'absolute',
        right: '0',
        bottom: '0',
        fontSize: '15px',
        background: '#fff',
        opacity: '0.7',
        textDecoration: 'none'
      }
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
  },
}))

export { useStyles }
