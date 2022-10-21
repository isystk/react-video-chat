import React, { FC, useContext } from 'react'
import * as Yup from 'yup'
import Modal from '@/components/01_atoms/Modal'
import { ContainerProps, WithChildren } from 'types'
import * as styles from './styles'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import { connect } from '@/components/hoc'
import MainService from '@/services/main'
import { Room } from '@/services/room'
import {
  Button,
  Grid,
  Typography,
  Paper,
  TextField,
  Fade,
  FormGroup,
  Container,
} from '@mui/material'
import { Formik, Form } from 'formik'
import AddCircleIcon from '@mui/icons-material/AddCircle'

/** RoomRegistModalProps Props */
export type RoomRegistModalProps = WithChildren & { room: Room }
/** Presenter Props */
export type PresenterProps = RoomRegistModalProps & {
  main
  videoInputDefault
  changeDevice
  videoInput
  audioInputDefault
  audioInput
  audioOutputDefault
  audioOutput
}

/** Presenter Component */
const RoomRegistModalPresenter: FC<PresenterProps> = ({
  main,
  initialValues,
  validationSchema,
  onSubmit,
  onClose,
  ...props
}) => (
  <>
    <Modal isOpen={main.room.isOpen} handleClose={onClose}>
      <Container component="main" maxWidth="xs">
        <Fade in={main.room.isOpen}>
          <Paper style={{ marginTop: '25px' }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Grid
                    container
                    spacing={3}
                    style={{ padding: '20px' }}
                    justifyContent="center"
                  >
                    <Grid item xs={12} sm={12} md={12}>
                      <FormGroup style={{ margin: 8 }}>
                        <Typography style={{ marginLeft: 8 }}>
                          部屋名
                        </Typography>
                        <TextField
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          className="red-border"
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!(touched.name && errors.name)}
                          helperText={errors.name}
                        />
                        <Typography style={{ marginLeft: 8 }}>本文</Typography>
                        <TextField
                          fullWidth
                          margin="normal"
                          multiline
                          rows={4}
                          InputLabelProps={{ shrink: true }}
                          variant="outlined"
                          type="text"
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!(touched.description && errors.description)}
                          helperText={errors.description}
                        />
                        <Grid
                          container
                          style={{ paddingTop: 30 }}
                          justify="center"
                          direction="row"
                        >
                          <Grid item>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              startIcon={<AddCircleIcon />}
                            >
                              登録する
                            </Button>
                          </Grid>
                        </Grid>
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Fade>
      </Container>
    </Modal>
  </>
)

/** Container Component */
const RoomRegistModalContainer: React.FC<
  ContainerProps<RoomRegistModalProps, PresenterProps>
> = ({ presenter, children, room, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>

  const isNew = !room

  // フォームの初期値
  let initialValues = {
    name: '',
    description: '',
  }
  if (room) {
    initialValues = {
      name: room.name ?? '',
      description: room.description ?? '',
    }
  }
  // フォームのバリデーション
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('部屋名を入力してください。'),
    description: Yup.string().required('説明文を入力してください。'),
  })

  const onClose = () => {
    main.room.isOpen = false
    main.setAppRoot()
  }

  // フォームの送信
  const onSubmit = async (values: Form) => {
    console.log(values)
    if (isNew) {
      const newRoom = { ...values } as Room
      await main?.room.createRoom(newRoom)
    } else {
      const newRoom = { ...values, id: room.id } as Room
      await main?.room.updateRoom(newRoom)
    }
    onClose()
  }

  return presenter({
    children,
    main,
    initialValues,
    validationSchema,
    onSubmit,
    onClose,
    ...props,
  })
}

export default connect<RoomRegistModalProps, PresenterProps>(
  'RoomRegistModal',
  RoomRegistModalPresenter,
  RoomRegistModalContainer
)
