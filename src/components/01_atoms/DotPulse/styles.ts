import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  dotPulse: {
    position: 'relative',
    left: '-9999px',
    textAlign: 'initial',
    width: '10px',
    height: '10px',
    borderRadius: '5px',
    backgroundColor: '#9880ff',
    color: '#9880ff',
    boxShadow: '9999px 0 0 -5px #9880ff',
    animation: '$dotPulse 1.5s infinite linear',
    animationDelay: '.25s',
    '&::before, &::after': {
      content: '""',
      display: 'inline-block',
      position: 'absolute',
      top: '0',
      width: '10px',
      height: '10px',
      borderRadius: '5px',
      backgroundColor: '#9880ff',
      color: '#9880ff',
    },
    '&::before': {
      boxShadow: '9984px 0 0 -5px #9880ff',
      animation: '$dotPulseBefore 1.5s infinite linear',
      animationDelay: '0s',
    },
    '&::after': {
      boxShadow: '10014px 0 0 -5px #9880ff',
      animation: '$dotPulseAfter 1.5s infinite linear',
      animationDelay: '.5s',
    },
  },
  '@keyframes dotPulseBefore': {
    '0%': {
      boxShadow: '9984px 0 0 -5px #9880ff',
    },
    '30%': {
      boxShadow: '9984px 0 0 2px #9880ff',
    },
    '60%, 100%': {
      boxShadow: '9984px 0 0 -5px #9880ff',
    },
  },
  '@keyframes dotPulse': {
    '0%': {
      boxShadow: '9999px 0 0 -5px #9880ff',
    },
    '30%': {
      boxShadow: '9999px 0 0 2px #9880ff',
    },
    '60%,100%': {
      boxShadow: '9999px 0 0 -5px #9880ff',
    },
  },
  '@keyframes dotPulseAfter': {
    '0%': {
      boxShadow: '10014px 0 0 -5px #9880ff',
    },
    '30%': {
      boxShadow: '10014px 0 0 2px #9880ff',
    },
    '60%,100%': {
      boxShadow: '10014px 0 0 -5px #9880ff',
    },
  },
}))

export { useStyles }
