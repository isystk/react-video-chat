import { css, keyframes } from '@emotion/css'

const useStyles = (theme) => css`{
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}`

export { useStyles }
