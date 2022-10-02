import React, { FC, useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'
import MainService from '@/services/main'
import Box from '@/components/01_atoms/Box'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import { FormControl, Typography } from '@material-ui/core'

/** InputFormRoomProps Props */
export type InputFormRoomProps = WithChildren
/** Presenter Props */
export type PresenterProps = InputFormRoomProps & {
  main
  classes
  label
  name
  setName
  isComposed
  setIsComposed
  initializeRemotePeer
  disabled
}

/** Presenter Component */
const InputFormRoomPresenter: FC<PresenterProps> = ({
  main,
  classes,
  label,
  name,
  setName,
  isComposed,
  setIsComposed,
  initializeRemotePeer,
  disabled,
  ...props
}) => (
  <>
    <Container component="main">
      <Box title="ログイン">
        <FormControl className={classes.form}>
          <Typography component="h1" variant="h5">
            {label}を入力してください
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label={label}
            margin="normal"
            name="name"
            onChange={(e) => setName(e.target.value)}
            onCompositionEnd={() => setIsComposed(false)}
            onCompositionStart={() => setIsComposed(true)}
            onKeyDown={async (e) => {
              if (isComposed) return
              if (e.target.value === '') return
              if (e.key === 'Enter') await initializeRemotePeer(e)
            }}
            required
            value={name}
            variant="outlined"
          />
          <Button
            className={classes.submit}
            color="primary"
            disabled={disabled}
            fullWidth
            onClick={async (e) => await initializeRemotePeer(e)}
            type="submit"
            variant="contained"
          >
            決定
          </Button>
        </FormControl>
      </Box>
    </Container>
  </>
)

/** Container Component */
const InputFormRoomContainer: React.FC<
  ContainerProps<InputFormRoomProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>
  const classes = useStyles()
  const label = '部屋の名前'
  const [disabled, setDisabled] = useState(true)
  const [name, setName] = useState('')
  const [isComposed, setIsComposed] = useState(false)

  useEffect(() => {
    const disabled = name === ''
    setDisabled(disabled)
  }, [name])

  const initializeRemotePeer = async (
    e:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.persist()

    if (name !== '') {
      // await main.room.setRoomName(name)
    }

    e.preventDefault()
  }

  if (main.self.name === '') return <></>
  if (main.room.name !== '') return <></>

  return presenter({
    children,
    main,
    classes,
    label,
    name,
    setName,
    isComposed,
    setIsComposed,
    initializeRemotePeer,
    disabled,
    ...props,
  })
}

export default connect<InputFormRoomProps, PresenterProps>(
  'InputFormRoom',
  InputFormRoomPresenter,
  InputFormRoomContainer
)
