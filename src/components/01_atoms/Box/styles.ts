import { css, keyframes } from '@emotion/css'

const useStyles = (theme) => css`{
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
    backgroundColor: '#eee',
    padding: '10px 20px',
    textAlign: 'left',
  },
}`

export { useStyles }
