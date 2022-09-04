import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  overlayBackground: {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(100, 100, 100, .8)',
    zIndex: '1000',
  },
  overlay: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#000',
    fontSize: '24px',
    textAlign: 'center',
    zIndex: '1001',
    maxWidth: '90%',
  },
  wrap: {
    backgroundColor: '#fff',
    padding: '20px 10px 40px',
  },
  closeBtn: {
    position: 'absolute',
    top: '5px',
    right: '10px',
    width: '35px',
    height: '20px',
  },
}))

export { useStyles }
