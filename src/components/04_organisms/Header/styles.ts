import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
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
}))

export { useStyles }
