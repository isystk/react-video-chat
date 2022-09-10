import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    padding: '20px 0px',
    // listStyle: "none",
    // "& li": {
    //   display: "inline",
    //   listStyle: "none",
    //   fontWeight: "bold",
    //   "&::after": {
    //     content: "'>'",
    //     padding: "0 0.2em",
    //     color: "#555",
    //   },
    //   "&::last-child::after": {
    //     content: "''",
    //   },
    //   "& a": {
    //     textDecoration: "none",
    //     color: "#52b5ee",
    //     "&::hover": {
    //       textDecoration: "underline"
    //     }
    //   }
    // }
  },
  box: {
    backgroundColor: '#fff',
    height: '80vh',
    position: 'relative',
    textAlign: 'center',
  },
  title: {
    backgroundColor: '#3f51b5',
    padding: '10px 20px',
    color: '#fff',
    textAlign: 'left',
  },
  form: {
    margin: '40px auto',
    maxWidth: '500px',
  },
}))

export { useStyles }
