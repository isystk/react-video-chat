import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  videoWrapper: {
    width: '100%',
    height: '70vh',
    position: 'relative',
    overflow: 'hidden',
    '& video, img': {
      objectFit: 'cover',
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: '0',
      left: '0',
    },
  },
}))

export { useStyles }
