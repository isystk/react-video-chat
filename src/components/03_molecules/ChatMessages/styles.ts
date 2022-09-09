import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  chatMessage: {
    padding: '20px 20px 0 20px',
    backgroundColor: '#f1f1f1',
    '& .message_row': {
      display: 'grid',
      gridTemplateColumns: '70%',
      marginBottom: '20px',
    },
    '& .message-text': {
      padding: '9px 14px',
      fontSize: '16px',
      marginBottom: '5px',
    },
    '& .message-time': {
      fontSize: '12px',
      color: '#777',
    },
    '& .other-message .message-time': {
      width: '66px',
      marginLeft: '65px',
    },
    '& .you-message': {
      justifyContent: 'end',
      '& .message-content': {
        justifyItems: 'end',
        display: 'grid',
      },
      '& .message-text': {
        color: 'rgb(73, 73, 73)',
        backgroundColor: 'rgb(92, 238, 92)',
        border: '1px solid rgb(92, 238, 92)',
        borderRadius: '14px 14px 0 14px',
      },
    },
    '& .other-message': {
      justifyItems: 'start',
      '& .message-content': {
        gridTemplateColumns: '48px 1fr',
        gridColumnGap: '15px',
        display: 'grid',
      },
      '& .message-text': {
        color: '#111',
        backgroundColor: '#eee',
        border: '1px solid #ddd',
        borderRadius: '14px 14px 14px 0',
      },
    },
    '& .head': {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
    },
  },
}))

export { useStyles }
