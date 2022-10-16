import { css, keyframes } from '@emotion/css'

const useStyles = (theme) => css`{
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  members: {
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
  },
}`

export { useStyles }
