import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  meBlock: {
    padding: "20px 10px",
    height: "100%",
    "& .head-photo": {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      margin: "0 auto",
      overflow: "hidden"
    },
    "& .head-photo img": {
      width: "100%"
    },
    "& .name": {
      width: "100%",
      fontSize: "24px",
      color: "#222222",
      textAlign: "center",
      marginTop: "15px"
    },
    "& .title": {
      width: "100%",
      fontSize: "16px",
      color: "#777777",
      textAlign: "center",
      marginTop: "5px",
    },
    "& .video": {
      width: "100%",
      textAlign: "center",
      marginTop: "5px",
    },
    "& .video a": {
      color: "#777777"
    },
    "& .video svg": {
      fontSize: "2.5em"
    }
  }
}))

export { useStyles }
