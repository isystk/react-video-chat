import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  circles: {
    position: 'relative',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  circlesLi: {
    position: 'absolute',
    display: 'block',
    listStyle: 'none',
    width: '20px',
    height: '20px',
    background: '#fff',
    animation: '$fadeOutRotation 25s linear infinite',
    bottom: '-150px',
  },
  '@keyframes fadeOutRotation': {
    '0%': {
      transform: 'translateY(0) rotate(0deg)',
      opacity: '1',
      borderRadius: '0',
    },
    '100%': {
      transform: 'translateY(-1000px) rotate(720deg)',
      opacity: '0',
      borderRadius: '50%',
    },
  },
}))

export { useStyles }
