import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: '32px',
    backgroundColor: '#fff',
    height: '80vh',
    '@media screen and (min-width:992px)': {
      marginTop: '64px',
    },
  },
  title: {
    backgroundColor: '#3f51b5',
    padding: '10px 10px',
    color: '#fff',
    '@media screen and (min-width:992px)': {
      padding: '10px 40px',
    },
  },
  breadcrumbs: {
    margin: '0',
    padding: '20px 10px',
    '@media screen and (min-width:992px)': {
      padding: '10px 40px',
    },
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
  form: {
    textAlign: 'center',
    margin: '40px auto',
    width: '90%',
    maxWidth: '500px',
  },
}))

export { useStyles }
