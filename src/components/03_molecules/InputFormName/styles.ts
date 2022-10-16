import { css, keyframes } from '@emotion/css'

const useStyles = (theme) => css`{
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  form: {
    margin: '40px auto',
    maxWidth: '500px',
  },
}`

export { useStyles }
